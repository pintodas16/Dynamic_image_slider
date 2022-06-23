from django.http import HttpResponse
from django.shortcuts import render
from django.http import HttpResponse
from .models import Slider

# Create your views here.
def slider(request):
    all_data = Slider.objects.all()
    context = {
        'all_data':all_data,
    }
    return render(request, 'slider.html', context)
