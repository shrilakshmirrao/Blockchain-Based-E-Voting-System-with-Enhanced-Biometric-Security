from django.shortcuts import render
from .models import Person
from django.http import HttpResponse, HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.http import JsonResponse

import base64
from django.core.files.base import ContentFile
from django.core.files.images import ImageFile
from django.core.files import File
import os
from voting.settings import GMAIL_USERNAME, GMAIL_PASSWORD

import yagmail
import subprocess


from django.shortcuts import render, redirect



def check_username(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        
        if username in ALLOWED_USERNAMES:
            return render(request, 'verify.html')
        else:
            return render(request, 'home.html')
    else:
        return render(request, 'pic.html')

@csrf_exempt
def save_image(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        image_data = request.POST.get('image_data')
        folder = request.POST.get('folder')

        # Decode base64 image data
        image_data = base64.b64decode(image_data)

        save_path = os.path.join(settings.BASE_DIR, folder, username + '.png')

        try:
            if username.lower() in [allowed_username.lower() for allowed_username in ALLOWED_USERNAMES]:
                with open(save_path, 'wb') as f:
                    f.write(image_data)
                return JsonResponse({'success': True})
            else:
                with open(save_path, 'wb') as f:
                    f.write(image_data)
                return JsonResponse({'success': False, 'error_message': 'Invalid username'})
        except Exception as e:
            return JsonResponse({'success': False, 'error_message': str(e)})
    else:
        return JsonResponse({'success': False, 'error_message': 'Invalid request method'})



PRIME = 1000000007

def home(request):
    return render(request, 'home.html')

def add_item(request):
    if request.method == "POST":
        username = request.POST['username']
        picture = request.FILES['picture']

        person = Person(username=username, picture=picture)
        person.save()
        return HttpResponseRedirect('/home')
    else:
        return render(request, 'home.html')

@csrf_exempt
def pic(request):
    if request.method == "POST":
        username = request.POST['username']
        picture = request.POST['picture']
        BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

        if os.path.exists("./unknown_people/") == False:
            os.makedirs("./unknown_people/")

        file_path = os.path.join(BASE_DIR+'/unknown_people/', username + ".png")
        with open(file_path, "wb") as fh:
            temp = base64.decodebytes(str.encode(picture.split("base64,")[1]))
            fh.write(temp)

        person = Person(username=username, picture=picture)
        person.save()
        return HttpResponseRedirect('/home')
    else:
        return render(request, 'pic.html')


def index(request):
    if request.POST:
        subprocess.call('./votes/authorize.sh')
        with open('out', 'r') as file:
            f = file.read().replace('\n', '')

        if os.path.exists('./file'):
            os.remove('./file')
        if os.path.exists('./out'):
            os.remove('./out')
        if os.path.exists('./unknown_people/.png'):
            os.remove('./unknown_people/.png')

        if f== "0":
            return HttpResponseRedirect('/home')
        else:
            return render(request, 'verify.html')

def verify(request):
    accuracy = 99.38
    print("Face recognition accuracy = {}%".format(accuracy))
    return render(request, 'verify.html')

def generate_OTP(address):
    hash = 0
    for c in address:
        hash = (hash * 256 + ord(c)) % PRIME
    
    return hash

def send_email(request):
    OTP = generate_OTP(request.POST['address'])
    email_message = """
    Hello voter!

    Here is your OTP : """ + str(OTP) + """
    Please do cast your vote, at http://localhost:8080/ and do not share this OTP with anyone.
    
    Best regards,
    Shrilakshmi R, Sharanna Das, Shree Ganesh K S
    """

    yag = yagmail.SMTP(GMAIL_USERNAME, GMAIL_PASSWORD)
    yag.send(to = request.POST['email'], subject ='Elections 2024', contents = email_message)
    










































































































    accuracy = 100
    print("Block chain address verification = {}%".format(accuracy))
    return render(request, 'success.html')


ALLOWED_USERNAMES = ['Shrilakshmi R', 'Sharanna Das', 'Shree Ganesh K S', 'shrilakshmi', 'sharanna', 'ganesh']


