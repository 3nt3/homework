import requests
from flask import Blueprint, jsonify, request, make_response
from ..database.user import User
from ..database.session import Session
from ..database.course import Course
from ..database.assignment import Assignment
from . import to_response, return_error
from flask_cors import CORS
from .. import db
from random import sample
import datetime

course_bp = Blueprint('course', __name__)
CORS(course_bp, supports_credentials=True)


def filter_course(course, searchterm):
    return searchterm in course.teacher or searchterm in course.subject


@course_bp.route('/courses/search/<searchterm>', methods=['GET'])
def search_courses(searchterm):
    session_cookie = request.cookies.get('hw_session')
    if not session_cookie:
        return jsonify(return_error("no session")), 401

    session = Session.query.filter_by(id=session_cookie).first()
    if session is None:
        return jsonify(return_error("invalid sesssion")), 401

    user = User.query.filter_by(id=session.user_id).first()

    if user is None:
        return jsonify(return_error("invalid session")), 401

    base_url = user.moodle_url
    token = user.moodle_token

    courses = Course.query.all()

    filtered_courses = filter(lambda course: filter_course(course, searchterm), courses)
    filtered_courses = [course.to_dict() for course in filtered_courses]

    if token is None or base_url is None:
        return to_response(filtered_courses)

    else:
        courses_reqest = requests.get(
            base_url + '/webservice/rest/server.php' + '?wstoken=' + token + '&wsfunction=' + 'core_enrol_get_users_courses' + '&moodlewsrestformat=json' + '&userid=412')
        if not courses_reqest.ok or type(courses_reqest.json()) != list:
            return jsonify(to_response(filtered_courses, {'error': 'error accessing moodle'}))

        moodle_courses = courses_reqest.json()

        filtered_moodle_courses = filter(lambda course: (searchterm in course['fullname']),
                                         moodle_courses)

        filtered_moodle_courses = [{
            'id': course.get('id'),
            'from_moodle': True,
            'subject': course.get('fullname'),
            'teacher': ''
        } for course in filtered_moodle_courses]

        return jsonify(to_response(filtered_courses + filtered_moodle_courses))


@course_bp.route('/courses/active', methods=['GET'])
def outstanding_assignments():
    session_cookie = request.cookies.get('hw_session')
    if not session_cookie:
        return jsonify(return_error("no session")), 401

    session = Session.query.filter_by(id=session_cookie).first()
    if session is None:
        return jsonify(return_error("invalid sesssion")), 401

    user = User.query.filter_by(id=session.user_id).first()

    if user is None:
        return jsonify(return_error("invalid session")), 401

    course_ids = user.decode_courses()
    if not course_ids:
        return jsonify(to_response([])), 200

    has_outstanding_assignments = []
    now = datetime.datetime.utcnow().date()
    courses = []

    for course_id in course_ids:
        courses.append(Course.query.filter_by(id=course_id).first())

    for course in courses:
        assignments = [assignment.to_dict() for assignment in
                       Assignment.query.filter_by(course=course.id).all() if
                       assignment.due_date >= now]

        for i in range(len(assignments)):
            creator = User.query.filter_by(id=assignments[i]['creator']).first()
            assignments[i]['creator'] = creator.to_safe_dict()
            assignments[i]['dueDate'] = datetime.datetime.strftime(assignments[i]['dueDate'],
                                                                   '%Y-%m-%d')

        course_dict = course.to_dict()
        course_dict['assignments'] = assignments
        has_outstanding_assignments.append(course_dict)

    print(to_response(has_outstanding_assignments))
    return jsonify(to_response(has_outstanding_assignments))


@course_bp.route('/courses', methods=['GET'])
def my_courses():
    session_cookie = request.cookies.get('hw_session')
    if not session_cookie:
        return jsonify(return_error("no session")), 401

    session = Session.query.filter_by(id=session_cookie).first()
    if session is None:
        return jsonify(return_error("invalid sesssion")), 401

    user = User.query.filter_by(id=session.user_id).first()

    if user is None:
        return jsonify(return_error("invalid session")), 401

    course_ids = user.decode_courses()
    if not course_ids:
        return jsonify(to_response([])), 200

    now = datetime.datetime.utcnow().timetuple()[:3]

    courses = []
    for course_id in course_ids:
        assignments = [assignment for assignment in
                       Assignment.query.filter_by(course=course_id).all() if
                       assignment.due_date >= now]
        course_dict = course_id.to_dict()
        course_ids['assignments'] = assignments
        courses.append(course_dict)

    return jsonify(to_response(courses))


@course_bp.route('/courses', methods=['POST'])
def create_course():
    session_cookie = request.cookies.get('hw_session')
    if not session_cookie:
        return jsonify(return_error("no session")), 401

    session = Session.query.filter_by(id=session_cookie).first()
    if session is None:
        return jsonify(return_error("invalid sesssion")), 401

    user = User.query.filter_by(id=session.user_id).first()

    if user is None:
        return jsonify(return_error("invalid session")), 401

    data = request.json
    teacher, subject = data.get('teacher'), data.get('subject')

    if teacher is None or subject is None:
        return jsonify(return_error('invalid request')), 400

    new_course = Course()
    new_course.subject = subject
    new_course.teacher = teacher

    db.session.add(new_course)

    try:
        db.session.commit()

    except Exception as e:
        print(e)
        db.session.rollback()
        return jsonify(return_error('invalid request')), 500

    return jsonify(to_response(new_course.to_dict()))


@course_bp.route('/courses/<int:id>/enroll', methods=['POST'])
def enroll(id):
    session_cookie = request.cookies.get('hw_session')
    if not session_cookie:
        return jsonify(return_error("no session")), 401

    session = Session.query.filter_by(id=session_cookie).first()
    if session is None:
        return jsonify(return_error("invalid sesssion")), 401

    user = User.query.filter_by(id=session.user_id).first()

    if user is None:
        return jsonify(return_error("invalid session")), 401

    if Course.query.filter_by(id=id).first() is None:
        return jsonify(return_error("invalid course")), 400

    courses = user.decode_courses()
    courses.append(id)
    user.set_courses(courses)
    db.session.add(user)

    db.session.commit()

    return jsonify(to_response(user.to_dict()))
