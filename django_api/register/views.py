from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
import json

# Create your views here.


@csrf_exempt
def register(request):
    if request.method == 'POST':
            data = json.loads(request.body)
            first_name=data.get('first_name')
            last_name=data.get('last_name')
            email=data.get('email')
            username=data.get('username')
            password=data.get('password')
            confirmPassword=data.get('confirmPassword')
            if first_name and last_name and email and username and password and password == confirmPassword:
                try:
                    if User.objects.filter(username=username).exists():
                        return JsonResponse({'message':'Username is already used'},status=403)
                    elif User.objects.filter(email=email).exists():
                        return JsonResponse({'message':'Email is already used'},status=403)
                    elif password != confirmPassword:
                        return JsonResponse({'message': 'Your password not match'}, status=400)
                    elif not (first_name and last_name and email and username and password and confirmPassword):
                        return JsonResponse({'message': 'Please check your inputs'}, status=400)
                    elif (first_name and last_name and email and username and password and confirmPassword):
                        user = User.objects.create(
                        first_name=first_name,
                        last_name=last_name,
                        username=username,
                        email=email,
                        )
                        user.set_password(password)
                        user.save()
                        Token.objects.filter(user=user).delete()
                        token = Token.objects.create(user=user)
                        return JsonResponse({'message':'User has been created','token':token.key},status=201)
                    else:
                        return JsonResponse({'message': 'Please check your inputs'}, status=400)                    
                except:
                    return JsonResponse({'message': 'Invalid JSON'}, status=400)
            elif password != confirmPassword:
                return JsonResponse({'message': 'Your password not match'}, status=400)
            else:
                return JsonResponse({'message': 'Please check your inputs'}, status=400)   
    else:
        return JsonResponse({'message':'Method not allowed'},status=405)