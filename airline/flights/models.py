from django.db import models

# Create your models here.

class Airport(models.Model):
    code = models.CharField(max_length=3)
    city = models.CharField(max_length=64)

    def __str__(self):
        return f"{self.city} ({self.code})"

class Flight(models.Model):

    #This field is a foreign key that refs "Airport". If a row is deleted from Airport, delete every Flight related to that airport. related_name allows you to get any Flights with a given origin
    origin = models.ForeignKey(Airport, on_delete=models.CASCADE, related_name="departures")   

    destination = models.ForeignKey(Airport, on_delete=models.CASCADE, related_name="arrivals")   
    duration = models.IntegerField()

    def __str__(self):
        return f"{self.id}: {self.origin} to {self.destination} in {self.duration} minutes."
    
class Passenger(models.Model):
    first = models.CharField(max_length=64)
    last = models.CharField(max_length=64)
    flights = models.ManyToManyField(Flight, blank=True, related_name="passengers")  #Allows passengers to have zero OR MORE flights. 

    def __str__(self):
        return f"{self.first.capitalize()} {self.last.capitalize()}"