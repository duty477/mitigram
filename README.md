# Mitigram

This is an Angular project called Mitigram, which consists of various components and features for managing notifications and contacts.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.4.

##Clone the Repository:

`git clone <repository-url>`
`cd mitigram`

##Install Dependencies:

Use npm or yarn to install the project dependencies:

`npm install`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Unit tests are available and have been written for core elements and some partial components.

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Project Structure

The project is structured as follows:

* **src**:
  * **app**:
    * **core**: Contains core elements of the application, such as buttons and basic UI components.
    * **models**: Stores data models used throughout the application.
    * **pages**: Contains the main pages of the project.
    * **partials**: Contains larger page sections or components that are used across multiple pages.
    * **pipes**: Houses custom Angular pipes for data manipulation.
    * **services**: Contains various services used for different functionalities.
    * **utils**: Includes global functions and interfaces used across the project.
  * **assets**: Stores static assets such as images and other resources.

## Project Overview

Mitigram is composed of three main sections:

### 1.Dashboard

The Dashboard section provides information about notifications and displays the latest added contacts.

### 2. Address Book

The Address Book section allows users to manage their contacts. Users can:
 
* Add contacts by selecting them from the list.
* Filter the contact list by groups, names etc.
* Sort the contact list by clicking on table headers.
* Manually add contacts by entering their email addresses.
* Use group filters to select a specific group and invite all or selected group members.

### 3.Invitations

In the Invitations section, users can manage invited contacts. They can:

* After saving, the data is stored in localstorage
* View and filter the list of invited contacts.
* Remove invited contacts as needed.

### Home Page

The Home Page serves as the initial landing page for the project.

Feel free to explore and contribute to this Angular project. If you have any questions or need further information, please refer to the project's documentation or contact the project maintainers.


