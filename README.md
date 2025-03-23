# Los Angeles Crime Application

This application presents an analysis of crime statistics over the last year in Los Angeles by LAPD area station.

<p align="center">
  <img src="https://i.imgur.com/KMk46ep.png" alt="Description of image" />
</p>

The purpose is to provide users with relevant knowledge that can inform decisions such as relocation, travel, school selection and more.

The visualizations are powered by data from the Los Angeles Open Data resource (https://data.lacity.org/). The specific dataset utilized was "Crime Data from 2020 to Present".

Before using the data, the original dataset needed to be parsed and cleaned. It provided crimes by date (month/day/year format), area name, crime code and description. In order to create the visualizations based on the demographics we wanted to analyze, the data was grouped by area name, crime code, age, sex, and race. The month was extracted from the date column. Once prepared, the data was converted to a JSON file, and the visualizations were rendered in the flask app by fetching the data from the file.

The user has the option to navigate from the homepage to a dashboard of statistical visualizations or a reference map displaying the LAPD area station jurisdictions.
![Alt text](https://i.imgur.com/6dWvIgX.png)

The statistics overview page provides the user with the frequency of crimes for each month of the year, by the type of crime: violent, property, stolen vehicle, drug/sex crimes, or other. Below this grouped bar graph is a series of pie charts showing the distribution of victims for the year by age, sex, and race.
![Alt text](https://i.imgur.com/pGRhwo3.png)

Ethical considerations were incorporated. There was no identifying information on individuals included in this analysis, all remain anonymous.
An effort was made to include all ages, sexes, and races present in the dataset. Counts and percentages are based solely on what is present in the data and not altered in any way.

It is possible that some users may draw conclusions about crime in L.A. based on personal bias or discrimination towards persons of certain sex, race, and age.
While we cannot prevent individual bias and discrimination, we can be certain this project is not furthering it by ensuring an objective analysis and presentation.

Please note: The JSON file containing the data for this application is too large to be pushed to the remote repository. The link to the Google Drive folder for it can be found here: https://drive.google.com/drive/folders/1jxgoZzVjUGFPy0c2Xw9kcjUvDYirk5UI

To use the application, follow these steps:
  1. Ensure that the Flask library is installed.
  2. Copy the data.json file from the Google Drive folder into the data folder of the application (file path: LA_Crime_Dashboard\static\data).
  3. In the terminal, navigate into the repository folder and run the application with the command: python flaskapp.py
  4. Copy the URL that appears in the terminal and paste it into your browser bar.
  5. A homepage will appear with links to view statistics or the map.
