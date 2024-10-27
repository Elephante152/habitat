'use client';

import { useState, useEffect } from 'react';
import { config } from 'dotenv';
config();
import { Search, Droplet, Wind, Tag, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField as FormFieldType,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm, ControllerRenderProps } from "react-hook-form";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectItem, SelectContent } from "@/components/ui/select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const formSchema = z.object({
  businessName: z.string(),
  businessType: z.string(),
  city: z.string(),
  neighborhood: z.string(),
  email: z.string().email(),
  website: z.string().url().optional(),
  discountHours: z.string(),
  discountPercentage: z.number(),
  discountMethod: z.string(),
});


type FormValues = z.infer<typeof formSchema>;


type ForecastItem = {
  date: string;
  temp: number;
  condition: string;
};


type WeatherData = {
  city: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: string;
};


type Business = {
  name: string;
  type: string;
  neighborhood: string;
  discountHours: string;
  discountPercentage: number;
  discountMethod: string;
};


type Suggestion = string;

const FormField = FormFieldType as any;

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showExtendedForecast, setShowExtendedForecast] = useState(false);
  const [showBusinessForm, setShowBusinessForm] = useState(false);
  const [isCelsius, setIsCelsius] = useState(true); // Default to Celsius for consistency
  const [activeTab, setActiveTab] = useState('forecast');
  const [weatherCondition, setWeatherCondition] = useState('clear');
  const [neighborhoods, setNeighborhoods] = useState<string[]>([]);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('');
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (searchQuery === '') {
      setWeatherData(null);
      setForecast([]);
      setBusinesses([]);
      setWeatherCondition('clear');
      setNeighborhoods([]);
      setSelectedNeighborhood('');
      setErrorMessage(null);
    }
  }, [searchQuery]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (searchQuery === '') {
      const conditions = ['clear', 'clouds', 'rain', 'snow'];
      let index = 0;
      interval = setInterval(() => {
        setWeatherCondition(conditions[index]);
        index = (index + 1) % conditions.length;
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [searchQuery]);

  const handleSearch = async (query: string) => {
    if (query.trim() === '') {
      return;
    }

    try {
      // Fetch current weather data from OpenWeatherMap API
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=${isCelsius ? 'metric' : 'imperial'}`
      );
      const weatherData = await weatherResponse.json();

      if (weatherResponse.ok && weatherData && weatherData.main) {
        setWeatherData({
          city: weatherData.name,
          temperature: Math.round(weatherData.main.temp),
          humidity: weatherData.main.humidity,
          windSpeed: Math.round(weatherData.wind.speed),
          condition: weatherData.weather[0].main.toLowerCase(),
        });

        setWeatherCondition(weatherData.weather[0].main.toLowerCase());
        setErrorMessage(null);
      } else {
        console.error('Error fetching weather data:', weatherData.message);
        setWeatherData(null);
        setErrorMessage('City not found. Please check the spelling or try another city.');
      }

      // Fetch 5-day forecast data from OpenWeatherMap API
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=${API_KEY}&units=${isCelsius ? 'metric' : 'imperial'}`
      );
      const forecastData = await forecastResponse.json();

      if (forecastResponse.ok && forecastData && forecastData.list) {
        const formattedForecast = forecastData.list
          .filter((item: any) => item.dt_txt.includes('12:00:00')) // Use consistent times for daily data
          .slice(0, 5)
          .map((item: any) => ({
            date: new Date(item.dt_txt).toLocaleDateString('en-US', { weekday: 'short' }),
            temp: Math.round(item.main.temp),
            condition: item.weather[0].main.toLowerCase(),
          }));
        setForecast(formattedForecast);
        setErrorMessage(null);
      } else {
        console.error('Error fetching forecast data:', forecastData.message);
        setForecast([]);
        setErrorMessage('The city either does not exist or is not supported.');
      }

    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null);
      setForecast([]);
      setErrorMessage('An error occurred while fetching data. Please try again later.');
    }

    setNeighborhoods(['Downtown', 'West End', 'Kitsilano', 'Mount Pleasant', 'Gastown']);
    setSelectedNeighborhood('');
    setBusinesses([]);
    setShowSuggestions(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.length > 2) {
      setSuggestions(['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix']);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(searchQuery);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    handleSearch(suggestion);
  };

  const handleSubmitBusiness = (data: FormValues) => {
    console.log('Business submitted:', data);
    setShowBusinessForm(false);
  };

  const handleNeighborhoodSelect = (neighborhood: string) => {
    setSelectedNeighborhood(neighborhood);
    setShowUnlockAnimation(true);

    setBusinesses([
      { name: 'Cafe Habitat', type: 'restaurant', neighborhood: neighborhood, discountHours: '2PM - 4PM', discountPercentage: 50, discountMethod: 'Special menu for Habitat users' },
      { name: 'Eco Grocers', type: 'retail', neighborhood: neighborhood, discountHours: '7PM - 9PM', discountPercentage: 15, discountMethod: 'Discount applied at checkout' },
      { name: 'Green Fitness', type: 'service', neighborhood: neighborhood, discountHours: '1PM - 3PM', discountPercentage: 30, discountMethod: 'Discount on select services' },
    ]);

    setTimeout(() => setShowUnlockAnimation(false), 2000);
  };

  const convertTemperature = (temp: number) => {
    if (isCelsius) {
      return Math.round(temp);
    }
    return Math.round((temp * 9) / 5 + 32);
  };

  const formatTemperature = (temp: number) => {
    const convertedTemp = convertTemperature(temp);
    return `${convertedTemp}°${isCelsius ? 'C' : 'F'}`;
  };

  return (
    <div className={`min-h-screen p-8 relative overflow-hidden transition-colors duration-1000 ${
      weatherCondition === 'clear' ? 'bg-yellow-100' :
      weatherCondition === 'clouds' ? 'bg-gray-200' :
      weatherCondition === 'rain' ? 'bg-blue-100' :
      weatherCondition === 'snow' ? 'bg-white' : 'bg-gray-100'
    }`}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {weatherCondition === 'clear' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-9xl animate-float">☀️</div>
          </div>
        )}
        {weatherCondition === 'clouds' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-9xl animate-float">☁️</div>
            <div className="text-9xl animate-float animation-delay-1000 ml-24">⛅</div>
          </div>
        )}
        {weatherCondition === 'rain' && (
          <div className="absolute inset-0">
            <div className="flex justify-around absolute w-full">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="text-5xl animate-rain" style={{ animationDelay: `${Math.random() * 2}s`, left: `${Math.random() * 100}%`, animationDuration: `${Math.random() * 1.5 + 1.5}s` }}>
                  💧
                </div>
              ))}
            </div>
          </div>
        )}
        {weatherCondition === 'snow' && (
          <div className="absolute inset-0">
            <div className="flex justify-around absolute w-full">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="text-5xl animate-snow" style={{ animationDelay: `${Math.random() * 2}s`, left: `${Math.random() * 100}%`, animationDuration: `${Math.random() * 2 + 2}s` }}>
                  ❄️
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="relative z-10">
        <h1 className="text-4xl font-bold text-center mb-8">Habitat Weather App</h1>

        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search for a city"
              value={searchQuery}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className="w-full pl-10 pr-16 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Button
              onClick={() => handleSearch(searchQuery)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full w-10 h-10 p-0 bg-primary hover:bg-primary/90 transition-shadow duration-200 ease-in-out hover:shadow-lg"
            >
              <Search className="h-5 w-5 text-primary-foreground" />
            </Button>
          </div>
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-lg shadow-lg">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        {errorMessage && (
          <div className="max-w-md mx-auto mb-4 text-red-500 text-center">
            {errorMessage}
          </div>
        )}

        {neighborhoods.length > 0 && (
          <div className="max-w-md mx-auto mb-8">
            <Select onValueChange={handleNeighborhoodSelect} value={selectedNeighborhood}>
              <SelectTrigger>
                {selectedNeighborhood || "Select a neighborhood"}
              </SelectTrigger>
              <SelectContent>
                {neighborhoods.map((neighborhood) => (
                  <SelectItem key={neighborhood} value={neighborhood}>
                    {neighborhood}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {showUnlockAnimation && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="text-6xl animate-bounce text-white">🎉 Neighborhood Discounts Unlocked! 🎉</div>
          </div>
        )}

        <div className="flex items-center justify-center mb-4">
          <Label htmlFor="temp-toggle" className="mr-2">°F</Label>
          <Switch
            id="temp-toggle"
            checked={isCelsius}
            onCheckedChange={setIsCelsius}
          />
          <Label htmlFor="temp-toggle" className="ml-2">°C</Label>
        </div>

        {weatherData && (
          <Card className="max-w-md mx-auto mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">{weatherData.city}</CardTitle>
              <CardDescription>Current Weather</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-6xl font-bold">{formatTemperature(weatherData.temperature)}</div>
                <div className="text-4xl">
                  {weatherData.condition === 'clear' && '☀️'}
                  {weatherData.condition === 'clouds' && '☁️'}
                  {weatherData.condition === 'rain' && '🌧️'}
                  {weatherData.condition === 'snow' && '❄️'}
                </div>
              </div>
              <div className="mt-4 flex justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  <Droplet className="mr-1 h-4 w-4" />
                  Humidity: {weatherData.humidity}%
                </div>
                <div className="flex items-center">
                  <Wind className="mr-1 h-4 w-4" />
                  Wind: {weatherData.windSpeed} {isCelsius ? 'm/s' : 'mph'}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {(forecast.length > 0 || businesses.length > 0) && (
          <Card className="max-w-4xl mx-auto mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold">Forecast & Discounts</CardTitle>
                <div className="flex items-center space-x-2">
                  <Calendar className={`h-5 w-5 ${activeTab === 'forecast' ? 'text-primary' : 'text-gray-400'}`} />
                  <Switch
                    id="tab-toggle"
                    checked={activeTab === 'discounts'}
                    onCheckedChange={(checked) => setActiveTab(checked ? 'discounts' : 'forecast')}
                  />
                  <Tag className={`h-5 w-5 ${activeTab === 'discounts' ? 'text-primary' : 'text-gray-400'}`} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {activeTab === 'forecast' && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">5-Day Forecast</h3>
                  <div className="grid grid-cols-5 gap-4">
                    {forecast.map((day, index) => (
                      <div key={index} className="text-center">
                        <div className="font-bold">{day.date}</div>
                        <div className="text-2xl my-2">
                          {day.condition === 'clear' && '☀️'}
                          {day.condition === 'clouds' && '☁️'}
                          {day.condition === 'rain' && '🌧️'}
                          {day.condition === 'snow' && '❄️'}
                        </div>
                        <div>{formatTemperature(day.temp)}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Button onClick={() => setShowExtendedForecast(true)}>
                      View Extended Forecast
                    </Button>
                  </div>
                </div>
              )}
              {activeTab === 'discounts' && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Neighbourhood Discounts</h3>
                  {selectedNeighborhood ? (
                    <>
                      <p className="text-sm text-gray-500 mb-4">Exclusive offers for Habitat users in {selectedNeighborhood}. Present your app to redeem.</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {businesses.map((business, index) => (
                          <Card key={index}>
                            <CardHeader>
                              <CardTitle>{business.name}</CardTitle>
                              <CardDescription>{business.type}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <p><strong>Discount Hours:</strong> {business.discountHours}</p>
                              <div className="flex items-center">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <p className="font-bold text-green-600 cursor-help">
                                        {business.discountPercentage}% off
                                      </p>
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom" className="w-64 p-4">
                                      <p className="font-semibold mb-2">Discount Details:</p>
                                      <p>{business.discountMethod}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-gray-500">Please select a neighborhood to view available discounts.</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <Dialog open={showExtendedForecast} onOpenChange={setShowExtendedForecast}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>7-Day Forecast</DialogTitle>
              <p className="text-sm text-muted-foreground">Extended weather forecast for the week ahead</p>
            </DialogHeader>
            {/* Extended forecast content would go here */}
            <DialogFooter>
              <Button onClick={() => setShowExtendedForecast(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={showBusinessForm} onOpenChange={setShowBusinessForm}>
          <DialogContent className="max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>List Your Business on Habitat</DialogTitle>
              <p className="text-sm text-muted-foreground">Enter your business details below</p>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmitBusiness)} className="space-y-4 pb-6">
                <FormField
                  control={form.control}
                  name="businessName"
                  render={({ field }: { field: ControllerRenderProps<FormValues, "businessName"> }) => (
                    <FormItem>
                      <FormLabel>Business Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your business name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="businessType"
                  render={({ field }: { field: ControllerRenderProps<FormValues, "businessType"> }) => (
                    <FormItem>
                      <FormLabel>Business Type</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Restaurant, Retail, Service" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }: { field: ControllerRenderProps<FormValues, "city"> }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your city" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="neighborhood"
                  render={({ field }: { field: ControllerRenderProps<FormValues, "neighborhood"> }) => (
                    <FormItem>
                      <FormLabel>Neighborhood</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your neighborhood" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }: { field: ControllerRenderProps<FormValues, "email"> }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter your email" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }: { field: ControllerRenderProps<FormValues, "website"> }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your website URL" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="discountHours"
                  render={({ field }: { field: ControllerRenderProps<FormValues, "discountHours"> }) => (
                    <FormItem>
                      <FormLabel>Discount Hours</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 2PM - 4PM" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="discountPercentage"
                  render={({ field }: { field: ControllerRenderProps<FormValues, "discountPercentage"> }) => (
                    <FormItem>
                      <FormLabel>Discount Percentage</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 20" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="discountMethod"
                  render={({ field }: { field: ControllerRenderProps<FormValues, "discountMethod"> }) => (
                    <FormItem>
                      <FormLabel>Discount Method</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Special menu, Discount at checkout" {...field} />
                      </FormControl>
                      <FormDescription>
                        Describe how the discount will be applied for Habitat users
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Submit</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        <div className="fixed bottom-8 right-8">
          <Button onClick={() => setShowBusinessForm(true)}>
            List Your Business
          </Button>
        </div>
      </div>
    </div>
  );
}
