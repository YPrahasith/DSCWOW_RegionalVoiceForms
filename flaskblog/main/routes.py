from flask import render_template, request, Blueprint
from flaskblog.models import Post
from flask_cors import cross_origin
import requests

main = Blueprint('main', __name__)


@main.route("/")
@main.route("/home")
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def home():
    page = request.args.get('page', 1, type=int)
    posts = Post.query.order_by(Post.date_posted.desc()).paginate(page=page, per_page=5)
    return render_template('home.html', posts=posts)


@main.route("/about")
def about():
    return render_template('about.html', title='About')

@main.route("/contribute")
def contribute():
    return render_template('contribute.html', title='Contribute')

@main.route("/translate", methods=['POST'])
def translate():
    data = request.get_json()
    url = "https://api.eu-gb.language-translator.watson.cloud.ibm.com/instances/f4c8c589-f096-4d8e-b70f-61babee0a814/v3/translate?version=2018-05-01"

    payload = "{\"text\": [\"" + data['text'][0] + "\"], \"source\":\"" + data['source'] + "\", \"target\":\"" + data['target'] + "\"}"
    headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Basic YXBpa2V5OkxFWTdKMTZDdE1MR2txa1NvbG9NY2t1a3VIRFI1NUR3eEZHZmNRaEJnRHJs'
    }

    response = requests.request("POST", url, headers=headers, data = payload)
    jsonResponse = response.json()
    print(jsonResponse)
    return(jsonResponse["translations"][0]['translation'])
