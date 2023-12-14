from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from dataclasses import dataclass
from flask_sqlalchemy import SQLAlchemy
import os
from flask_migrate import Migrate, migrate
import json

app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))

app.config['SQLALCHEMY_DATABASE_URI'] =\
        'sqlite:///' + os.path.join(basedir, 'database.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db = SQLAlchemy(app)
app.app_context().push()
migrate = Migrate(app, db)


class Seeker(db.Model):
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True)
    password = db.Column(db.String(), unique=False)
    name = db.Column(db.String(), unique=False)
    phone = db.Column(db.String(), unique=False)
    dob = db.Column(db.String(), unique=False)
    highest_qualification = db.Column(db.String(), unique=False)
    current_status = db.Column(db.String(), unique=False)
    current_location = db.Column(db.String(), unique=False)
    
class Collector(db.Model):
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), unique=False)
    username = db.Column(db.String(20), unique=True)
    password = db.Column(db.String(), unique=False)
    
class Admin(db.Model):
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), unique=False)
    username = db.Column(db.String(20), unique=True)
    password = db.Column(db.String(), unique=False)
    
class Moderator(db.Model):
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), unique=False)
    username = db.Column(db.String(20), unique=True)
    password = db.Column(db.String(), unique=False)

@dataclass
class Prospect(db.Model):
    id: int
    username: str
    password: str
    name: str
    reason: str
    role: str
    
    id = db.Column(db.Integer, primary_key=True)
    
    username = db.Column(db.String(20), unique=True)
    name = db.Column(db.String(), unique=False)
    password = db.Column(db.String(), unique=False)
    reason = db.Column(db.String(), unique=False)
    role = db.Column(db.String(), unique=False)
@dataclass
class Career_path(db.Model):
    id: int
    username: str
    time_line: str
    stage_name: str
    stage_description: str
    status: str
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=False)
    time_line = db.Column(db.String(), unique=False)
    stage_name = db.Column(db.String(), unique=False)
    stage_description = db.Column(db.String(), unique=False)
    status = db.Column(db.String(), unique=False)
    
class Career_form(db.Model):
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=False)
    stage_number = db.Column(db.String(), unique=False)
    grades = db.Column(db.String(), unique=False)
    Duration = db.Column(db.String(), unique=False)
    Income_source = db.Column(db.String(), unique=False)
    Annual_income = db.Column(db.String(), unique=False)
    Family = db.Column(db.String(), unique=False)
    guidance_source = db.Column(db.String(), unique=False)
    insights = db.Column(db.String(), unique=False)
    next_stage = db.Column(db.String(), unique=False)
    suggestion = db.Column(db.String(), unique=False)

@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')

@app.route('/rec/path', methods=['GET', 'POST'])
def recPath():
    if request.method == 'POST':
        txt = request.form['text']
        return render_template('rec_path.html', txt=txt)
@app.route('/login', methods=['GET', 'POST'])
def login():
    
    return render_template('login.html')



@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('index'))

@app.route('/register')
def register():
    
    return render_template('register.html')
@app.route('/register/seeker', methods=['GET', 'POST'])
def registerSeeker():
    
    print("DADADA", request.method, "dadad")
    
    if request.method == 'POST':
        print("TEST")
        username = request.form.get('username')
        password = request.form.get('password')
        name = request.form.get('name')
        phone = request.form.get('phone')
        dob = request.form.get('dob')
        address = request.form.get('address')
        highest_qualification = request.form.get('highest_qualification')
        current_status = request.form.get('current_status')
        current_location = request.form.get('current_location')
        seeker = Seeker(username=username, password=password, name=name, phone=phone, dob=dob, highest_qualification=highest_qualification, current_status=current_status, current_location=current_location)
        try: 
            db.session.add(seeker)
            db.session.commit()
            return "Success"
        except:
            db.session.rollback()
            print("Error")
            return "Error"
        return redirect(url_for('login'))
    return render_template('register_seeker.html')

@app.route('/login_attempt', methods=['GET', 'POST'])
def loginAttempt():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        exists = Seeker.query.filter_by(username=username, password=password).first() is not None

        if exists:
            return "Seeker"
        exists = Collector.query.filter_by(username=username, password=password).first() is not None
        if exists:
            return "Collector"
        exists = Admin.query.filter_by(username=username, password=password).first() is not None
        if exists:
            return "Admin"
        exists = Moderator.query.filter_by(username=username, password=password).first() is not None
        if exists:
            return "Moderator"
        return "Error"
        
    return render_template('login.html')
@app.route('/dashboard/seeker')
def seekerDashboard():
    return render_template('seeker_dash.html')

@app.route('/dashboard/collector')
def collectorDashboard():
    return render_template('collector_dash.html')

@app.route('/dashboard/admin')
def adminDashboard():
    return render_template('admin_dash.html')

@app.route('/dashboard/moderator')
def moderatorDashboard():
    return render_template('mod_dash.html')

@app.route('/validate_story')
def validate_story():
    return render_template('validate_story.html')

@app.route('/dashboard/seeker/profile')
def profile():
    return render_template('seeker_profile.html')

@app.route('/find/seeker', methods=['GET', 'POST'])
def findSeeker():
    if request.method == 'POST':
        username = request.form.get('username')
        values = Seeker.query.filter_by(username=username).first() 
        print(values, username)
        if values is None:
            return "Error"
        return {"username": values.username, "name": values.name, "phone": values.phone, "dob": values.dob, "highest_qualification": values.highest_qualification, "current_status": values.current_status, "current_location": values.current_location, "password": values.password}

@app.route('/update/seeker', methods=['GET', 'POST'])
def update_seeker():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        name = request.form.get('name')
        phone = request.form.get('phone')
        dob = request.form.get('dob')
        address = request.form.get('address')
        highest_qualification = request.form.get('highest_qualification')
        current_status = request.form.get('current_status')
        current_location = request.form.get('current_location')
        seeker = Seeker.query.filter_by(username=username).first()
        seeker.username = username
        seeker.password = password
        seeker.name = name
        seeker.phone = phone
        seeker.dob = dob
        seeker.highest_qualification = highest_qualification
        seeker.current_status = current_status
        seeker.current_location = current_location
        try: 
            db.session.commit()
            return "Success"
        except:
            db.session.rollback()
            print("Error")
            return "Error"
        return redirect(url_for('login'))
    return render_template('update_seeker.html')

@app.route('/apply', methods=['GET', 'POST'])
def apply():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        name = request.form.get('name')
        reason = request.form.get('reason')
        role = request.form.get('role')
        print(username, password, name, reason, role)
        prospect = Prospect(username=username, password=password, name=name, reason=reason, role=role)
        try: 
            db.session.add(prospect)
            db.session.commit()
            return "Success"
        except:
            db.session.rollback()
            print("Error")
            return "Error"
        return redirect(url_for('login'))
    return render_template('apply.html')

@app.route('/approve', methods=['GET', 'POST'])
def approve():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        name = request.form.get('name')
        role = request.form.get('role')
        if role == "Moderator":
            mod = Moderator(username=username, password=password, name=name)
            db.session.add(mod)
        elif role == "Collector":
            collector = Collector(username=username, password=password, name=name)
            db.session.add(collector)
        elif role == "Admin":
            admin = Admin(username=username, password=password, name=name)
            db.session.add(admin)
        
        Prospect.query.filter_by(username=username).delete()
        try: 
            db.session.commit()
            return "Success"
        except:
            db.session.rollback()
            print("Error")
            return "Error"
        return redirect(url_for('login'))
    return render_template('approve.html')

@app.route('/get_data', methods=['GET', 'POST'])
def get_data():
    if request.method == 'POST':
        values = Prospect.query.all()
        
        
        # print(jsonify(values))
        return jsonify(values)
    
    
@app.route('/reject_data', methods=['GET', 'POST'])
def reject_data():
    if request.method == 'POST':
        username = request.form.get('username')
        Prospect.query.filter_by(username=username).delete()
        try: 
            db.session.commit()
            return "Success"
        except:
            db.session.rollback()
            print("Error")
            return "Error"
        return redirect(url_for('login'))
    return render_template('approve.html')
@app.route('/approve_data', methods=['GET', 'POST'])
def approve_data():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        name = request.form.get('name')
        role = request.form.get('role')
        if role == "Moderator":
            mod = Moderator(username=username, password=password, name=name)
            db.session.add(mod)
        elif role == "Collector":
            collector = Collector(username=username, password=password, name=name)
            db.session.add(collector)
        elif role == "Admin":
            admin = Admin(username=username, password=password, name=name)
            db.session.add(admin)
        Prospect.query.filter_by(username=username).delete()
        try: 
            db.session.commit()
            return "Success"
        except:
            db.session.rollback()
            print("Error")
            return "Error"
    

@app.route('/forms', methods=['GET', 'POST'])
def forms():
    return render_template('forms.html')

@app.route('/make_story/<username>', methods=['GET', 'POST'])
def make_story(username):
    if request.method == 'POST':
        username = request.form.get('username')
        time_line = request.form.get('timeline')
        stage_name = request.form.get('stage_name')
        stage_description = request.form.get('stage_description')
        career_path = Career_path(username=username, time_line=time_line, stage_name=stage_name, stage_description=stage_description, status="Not sent")
        print(username, time_line, stage_name, stage_description)
        try: 
            db.session.add(career_path)
            db.session.commit()
            return "Success"
        except:
            db.session.rollback()
            print("Error")
            return "Error"
        return redirect(url_for('login'))
    return render_template('make_story.html', username=username)

@app.route('/get_stories', methods=['GET', 'POST'])
def get_stories():
    if request.method == 'POST':
        values = Career_path.query.with_entities(Career_path.username).distinct().all()
        print(values)
        # print(values)
        # return "Success"
        keys = [i[0] for i in values]
        # find rows with given username
        # print(Career_path.query.filter_by(username=keys[0]).first().status)
        stati = [Career_path.query.filter_by(username=i).first().status for i in keys]
        print(keys, stati)
        return [keys, stati]
    return render_template('get_stories.html')
@app.route('/get_sent_stories', methods=['GET', 'POST'])
def get_sent_stories():
    if request.method == 'POST':
        table1 = Career_path.query.filter_by(status = "Sent").all()
        keys = [i.username for i in table1]
        myset = set(keys)
        keys = list(myset)
        # table2 = select([Career_path.username]).distinct()
        print(keys)
        # values = table1.with_entities(Career_path.username).distinct().all()
        # values = Career_path.query.filter_by(status = "Sent").all().query.with_entities(Career_path.username).distinct().all()
        # print(values)
        # print(values)
        return keys
        # keys = [i[0] for i in values]
        # find rows with given username
        # print(Career_path.query.filter_by(username=keys[0]).first().status)
        # stati = [Career_path.query.filter_by(username=i).first().status for i in keys]
        # print(keys, stati)
        return keys
    return render_template('get_stories.html')
@app.route('/get_story/<username>', methods=['GET', 'POST'])
def get_story(username):
    if request.method == 'POST':
        values = Career_path.query.filter_by(username=username).all()
        # print(values)
        return jsonify(values)
    return render_template('get_story.html', username=username)

@app.route('/send_approval/<username>', methods=['GET', 'POST'])
def send_approval(username):
    if request.method == 'POST':
        print(username, "faa")
        num_rows_updated = Career_path.query.filter_by(username=username).update(dict(status="Sent")); 
        try: 
            db.session.commit()
            return "Success"
        except:
            db.session.rollback()
            print("Error")
            return "Error" 
        return "Success";
    return render_template('get_story.html', username=username)


@app.route('/finally_approve', methods=['GET', 'POST'])
def finally_approve():
    if request.method == 'POST':
        username = request.form.get('username')
        num_rows_updated = Career_path.query.filter_by(username=username).update(dict(status="Approved"));
        try: 
            db.session.commit()
            return "Success"
        except:
            db.session.rollback()
            print("Error")
            return "Error"
@app.route('/finally_reject', methods=['GET', 'POST'])
def finally_reject():
    if request.method == 'POST':
        username = request.form.get('username')
        Career_path.query.filter_by(username=username).delete()
        try: 
            db.session.commit()
            return "Success"
        except:
            db.session.rollback()
            print("Error")
            return "Error"
        
@app.route('/view_approved', methods=['GET', 'POST'])
def view_approved():
    if request.method == 'POST':
        table1 = Career_path.query.filter_by(status = "Approved").all()
        keys = [i.username for i in table1]
        myset = set(keys)
        keys = list(myset)
        return keys
    return render_template('view_approved.html')
if __name__ == '__main__':
    app.run(debug=True, port=8001)

