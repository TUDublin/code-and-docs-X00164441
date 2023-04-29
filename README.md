# Project Research

Section 1: Detailed Discussion

My objective for this project is to develop a Workout & Fitness Tracker mobile
application. I aim to create an app that incorporates features similar to those found in
popular fitness apps, such as Strong, Fitnotes, and JeFit. Considering the scope of a
fourth-year project, I will focus on a select few key features to ensure the app is both
realistic and achievable.

My proposed application will serve as an amalgamation of the aforementioned apps
and will provide a variety of features. These include allowing users to add custom
exercises, which will be stored in their account using the Firestore database. Users will
then be able to create workouts based on the exercises they have added, which will
also be stored in their account using Firestore. My app will provide functionality to edit
a workout by selecting or deselecting exercises or changing the workout name.
Additionally, users will be able to delete a workout, which will remove the data from
their account.

Users will also have the ability to update their account details, such as their full name,
email, age, etc., which will be reflected within Firestore. My app will notify users of any
changes they have made. Users will be able to view all the exercises they have added
and filter them by body part. For example, if a user creates an exercise called "Bicep
Curl" with the body part "Bicep," they will be able to filter by "Bicep," displaying only
the Bicep Curl exercise. Users will also have the option to filter by "All" exercises they
have created. Moreover, they will be able to delete any exercises they have created,
with these changes being reflected within Firestore. Users will also be able to view the
workouts they have created, presented with a screen that lists all their current
workouts.

Furthermore, the app will provide users with the option to delete their account,
ensuring a comprehensive removal of their personal data. Upon choosing to delete
their account, all exercises and workouts associated with the user will be deleted from
both the app and Firestore. This feature prioritizes user privacy and control over their
own data, allowing them to remove any trace of their activities within the app when
desired. By incorporating this functionality, my app demonstrates a commitment to
respecting user preferences and maintaining a high standard of data protection.

If time permits, my app will also include simple dark mode functionality, allowing users
to choose between light mode and dark mode for the entire app. I would like to
implement a calorie tracker screen that allows users to search for food queries and
receive a list of related foods. Users could view comprehensive nutrition data, obtained
from the Edamam API, and manage their daily calorie intake by adding or removing
foods.
I would also like to implement a weight tracker screen where users can input their
body weight, which will be plotted on a graph. They could view, edit, and delete past
weight entries to monitor their progress over time.

Lastly, if feasible, the app will include functionality that allows users to perform their
custom workouts with a rest timer feature and the ability to add sets and reps to an
exercise (e.g., three sets of eight reps of Bicep Curls with 30 seconds of rest). Users
would have the option to stop their workout prematurely or finish it early.

This mobile app would be suitable for the average person seeking simple workout and
exercise tracking and storage.

Section 2: Existing Applications in this domain
![image](https://user-images.githubusercontent.com/55252035/235324864-28702b3a-236e-4496-a88b-69b0e63ebda3.png)


Section 3: Platform, Technologies, and Libraries

To develop my mobile application, I have chosen React Native as the primary platform
due to its robust capabilities, cross-platform compatibility, and extensive support for
third-party libraries. React Native empowers developers to create feature-rich
applications using a single codebase for both Android and iOS devices, ensuring the
app's accessibility to a broader audience without sacrificing performance or
functionality.

React Native's component-based architecture enables a modular approach to building
user interfaces, making it easier to maintain, update, and extend the application's
features over time. Furthermore, its thriving community and large ecosystem of
libraries offer ample resources and tools to streamline the development process and
facilitate seamless integration with various services.

For the backend, I will utilize Firebase Auth for user management and data storage.
Firebase Auth offers a secure and scalable solution for handling user authentication,
social media logins, and password management. This is essential for an application that
requires storage of custom exercises and workouts, along with maintaining user
privacy and security.

Additionally, Firestore, a real-time NoSQL database provided by Firebase, will be
employed for storing user-specific data, such as exercises, workouts, and account
details. Firestore's real-time data synchronization and powerful querying capabilities
allow for efficient retrieval and updating of user information, ensuring a responsive and
seamless user experience.

In the context of my Workout & Fitness Tracker app, the primary data for this
application will be user-generated, focusing on custom exercises, workouts, calorie
data, weight tracking and account information. This data will be securely stored within
Firebase, with no need for external data sources to be integrated.
By centering on usergenerated content and data, my app will provide a personalized experience tailored to individual user preferences and goals, fostering a sense of ownership and motivation for users to achieve their fitness objectives.

Section 4: Risks

The development of my Workout & Fitness Tracker mobile app presents a variety of
risks that must be acknowledged and addressed. A primary concern is the potential for
the project's scope to become overly ambitious, leading to difficulties in implementing
the desired features within the timeframe of a fourth-year project. To mitigate this risk,
I have carefully scoped the project to focus on a realistic set of features that can be
successfully developed within the allotted time.

Another risk involves the complexity of integrating various technologies, such as React
Native and Firebase, which may result in unforeseen challenges or issues. To address
this, my project will rely on thorough research, testing, and consultation with expert
sources to ensure the proper implementation of these technologies.

Ensuring my app provides an exceptional user experience is crucial; thus, the risk of
inadequate user interface (UI) and user experience (UX) design must be considered. To
mitigate this risk, my design process will incorporate best practices in UI and UX design,
and user feedback will be sought to refine the app's interface and functionality.
Data security and user privacy are also of paramount importance in a fitness tracker
application. The risk of a data breach or unauthorized access to user information is a
significant concern. By utilizing Firebase Auth for user management and data storage,
my app will leverage a secure and reliable solution to safeguard user data.

Lastly, the risk of encountering time management challenges during the project's
development should be acknowledged. To mitigate this risk, careful planning, setting
realistic milestones, and monitoring progress regularly will be essential. Additionally, I
plan to maintain open communication with my project supervisor to help ensure timely
identification and resolution of any issues that may arise.

By addressing these risks and adhering to a realistic project scope, I aim for my
Workout & Fitness Tracker app to be successfully developed within the constraints of a
fourth-year project, while still providing a valuable tool for users to track and manage
their fitness goals.

![image](https://user-images.githubusercontent.com/55252035/235324893-4347912e-571f-4b9c-b333-4d94dd9daa91.png)

