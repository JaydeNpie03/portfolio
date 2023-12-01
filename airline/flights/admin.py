from django.contrib import admin

from .models import Flight, Airport, Passenger

# Register your models here.

class FlightAdmin(admin.ModelAdmin):        #Allows you to customize the admin page displayed when you're adding a Flight via the admin interface
    list_display = ("id", "origin", "destination", "duration")

class PassengerAdmin(admin.ModelAdmin):
    filter_horizontal = ("flights",)

admin.site.register(Flight, FlightAdmin)
admin.site.register(Airport)
admin.site.register(Passenger, PassengerAdmin)  #Uses the display setting that were set in PassengerAdmin 