from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, TextAreaField
from wtforms.validators import DataRequired


class PostForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    content = TextAreaField('Description', validators=[DataRequired()])
    firstq = StringField('Question 1', validators=[DataRequired()])
    secondq = StringField('Question 2', validators=[DataRequired()])
    thirdq = StringField('Question 3', validators=[DataRequired()])
    forthq = StringField('Question 4', validators=[DataRequired()])
    fifthq = StringField('Question 5', validators=[DataRequired()])
    submit = SubmitField('Post')
