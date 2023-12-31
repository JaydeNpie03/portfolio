from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.urls import reverse

from .models import Flight, Airport, Passenger


# Create your views here.

def index(request):
    return render(request, "flights/index.html", {
        "flights": Flight.objects.all()
    })

def flight(request, flight_id):
    flight = Flight.objects.get(pk=flight_id)   #PK (Primary Key) is another word for the unique ID. Remember SQL ID's are of type INTEGER PRIMARY KEY?
    return render(request, "flights/flight.html", {
        "flight": flight,
        "passengers": flight.passengers.all(),
        "non_passengers": Passenger.objects.exclude(flights=flight)  # Returns all people who are on this flight already. (Anyone with this flight in the "flights" variable)
    })

def book(request, flight_id):
    if request.method == 'POST':

        flight = Flight.objects.get(pk=flight_id)
        passenger = Passenger.objects.get(pk=int(request.POST["passenger"]))  #Should hold the passenger ID, so it should be an int!
        passenger.flights.add(flight)

        return HttpResponseRedirect(reverse("flight", args=(flight.id,)))   #That comma is neccesary, otherwise it cant iterate over the args..? IT raises an error