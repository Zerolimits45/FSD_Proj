Full Stack Development Project
Group Members: Aloysius, Kenneth, Xie Hong, Riyaz, Jia Hui

Responsibilities:
- Kenneth: User Accounts
- Aloysius: Car Registration
- Riyaz: Booking of car
- Xie Hong: Rating of Booking and Feedback
- Jia Hui: Discussion Forum

---Note---

Please Ensure that you have 2 accounts before testing

One for the user side and One for the admin side

To create an admin, you need to create any account and change the role to admin in the Learning database

For Admin end use admin account 

For User end use user account



Testing Protocols:
----------------------------------------------------------------------------------------------------------------


Kenneth:

- User Creation - User End

1. Naviagate to Sign up Page through the login page

2. Test validation of fields by pressing sign up button at the start

3. Fill in all fields of the sign up form and press sign up, you will be asked to key in an OTP [ OTP will be in the server console ] ( Check if notification shows up that says "Successfully signed up" )

4. Go to Login page again

5. Use the details from the sign up in the login fields ( Email and password to be used )

6. * When the login is successful the navbar will change *

7. Head to the profile page by pressing the name of the user

8. Ensure that the details of the user have been displayed on the profile page

9. Press the edit deatils button ( this should bring you to the edit profile page )

10. Key in a new name into the name field

11. Press Save Details Button

12. Ensure that the details have been changed

13. Press the Change Password button and change the password

14. Log out and test if the new password can be used to log in

Checking status: Completed [ 0 errors ]


- User Creation - Admin End

1. Press the Admin Dashboard and navigate to the customers tab

2. Press the edit button on the first user

3. Change the name and press the save details button

4. Ensure that the name has changed in the customer view for admins

5. Press the delete button and press delete in the pop up

6. Ensure that the account has been deleted

7. Navigate to the staff tab and press "add staff"

8. Key in details and press the add staff button

9. Go to the server console and click the link to allow the staff to be created ( it will open another tab but the staff should be added )

10. Ensure the staff is added

11. Press the edit button on the first staff

12. Change the name and press the save details button

13. Ensure that the name has changed in the staff view for admins

14. Press the delete button and press delete in the pop up

15. Ensure that staff has been removed

Checking Status: Completed [ 0 errors ]


----------------------------------------------------------------------------------------------------------------


Aloysius: 

- Car Registration - User End

1. Navigate to the Register Car tab on the navbar

2. Check validation for all fields but going to the end and pressing register car

3. Go back to step 1 and select a later start date than the end date ( Validation should show up to tell you about the date time )

4. Now fill up all the fields all the way and press register a car

5. Ensure that the notification of "Car Successfully registered"

6. Head to Booking page and ensure that the car has been created and is shown in the booking page

7. Head to the profile page and go to Registered Cars

8. Press edit details button

9. Change the gear and upload a new image ( Ensure the image preview has changed )

10. Press save details

11. Ensure the notification appears that tell you the details have been saved

12. Navigate to the booking page to see if the details has been changed

Checking Status: Completed [ 0 errors ]


- Car Registration - Admin End

1. Go to admin dashboard and go to registered cars tab

2. Ensure that the registered car has been created

3. Press edit button

4. Change the gear and upload a new image ( Ensure the image preview has changed )

5. Press save details

6. Ensure the notification appears again

7. Press the delete button and press delete in the pop up

8. Ensure that the registered car has been removed ( if you want more you can check the bookings page too )

Checking Status: Completed [ 0 errors ]


----------------------------------------------------------------------------------------------------------------


Riyaz:

- Booking of a car - User End

1. Navigate to the Rent a car tab

2. Press the rent button and ensure that the validation for the start date and end date needs to be filled in

3. Go back to step 2 and select a later start date than the end date ( Validation should show up to tell you about the date time )

4. Fill in the start and end date and press rent on the first car

5. Ensure that you are brought to a new screen showing you the details of the car

6. Fill up the license number field and press "Book now"

7. Ensure that you aree brought to the stripe checkout page

8. Key in the Card information [ Card No.: 4242 4242 4242 4242, Exp date: anyth, Cvv: anyth ]

9. Key in the name and press check out

10. Ensure that you are sent back to the home page

11. Navigate to the Profile page and head to the "My bookings" Tab

12. Ensure that the page has the latest booking there

Checking Status: Completed [ 0 errors ]


- Booking of a car - Admin End ( Ensure that you have two bookings to test these )

1. Login to the admin side

2. Navigate to the bookings tab

3. Press the edit Button on any booking and change the end date to a later date ( Ensure that the Price will increase )

4. Press the save details button and ensure that the notification appears to tell you the booking details have been saved

5. Navigate back to the bookings tab

6. Press the delete button on one of the bookings and press the delete button in the pop up

7. Ensure the booking has been deleted

8. Press the Complete booking button on the remaining booking

9. Ensure that the Booking status has been changed from ongoing to completed

10. Log out of Admin End and head back to User End ( Ensure that this is the user you used to create the booking )

11. Head to the profile page and navigate to the "My Bookings tab"

12. Ensure that the Rate Experience Button has appeared

Checking Status: Completed [ 0 errors ] 


----------------------------------------------------------------------------------------------------------------

Xie Hong: 

- Feedback and Rating - User End

1. Navigate to the My bookings page and press the Rate Experience Button

2. Ensure that you are brought to the rate bookings page

3. Press the stars to any amount to rate the booking

4. Key in a feedback and press the send feeback button

5. Ensure that the rating is correctly refelected on the booking

6. Navigate to the Feedback

7. Press the "Send Help Request" and ensure that the validation appears

8. Proceed to fill up the form and submit the form and ensure the notification shows up

9. Now head back to the Bookings page and find a booking that has not been completed

10. Press the Cancel Booking Button ONCE

11. Head to registered cars and press Remove Car Button ONCE ( Buttons should disappear when pressed indicating the request has gone through)

Checking Status: Completed [ 0 errors ]


- Feedback and Rating - Admin End

1. Navigate to the rating tab and show that the rating is there

2. Press delete on the rating and press the delete on the popup

3. Ensure that the rating has been deleted

4. Navigate to the Feedback tab and show that the feedback is there

5. Press delete on the feedback and press the delete on the popup

6. Ensure the feedback is deleted

7. Navigate to request tab and showcase the request

8. For request that says remove car, Press delete on the car with the corresponding id. For Request that says cancel booking, Press Cancel Booking on the booking with the corresponding id
( Ensure that the when the Cancel Booking button has been pressed the status will change to Cancelled )

9. After the request is completed, press delete on the request and press the delete on the popup

10. Ensure that the request has been removed

Checking Status:  Completed [ 0 errors ]


----------------------------------------------------------------------------------------------------------------


Jia Hui:

- Discussions - User End ( Please have 2 user accounts and use each to create a post each)

1. Navigate to Discussions tab 

2. Enter the Title and the description 

3. Press the Post button

4. Ensure that post is created

5. Go to Comments

6. Enter a Comment and press the comment button

7. Ensure that the Comment has increased by one and view the comment by pressing the comment button

8. Press the delete icon on the comment and ensure that the comment, has been removed

9. Navigate to the profile page and head to the posts tab ( you should only see posts created by you )

10. Press the delete button on the posts

11. Ensure that the post has been deleted

Checking status:  Completed [ 0 errors ]


- Discussions - Admin End

1. Login to Admin side

2. Navigate to Discussions tab 

3. Ensure that you are able to delete any users posts and delete any comment

Checking Status:  Completed [ 0 errors ]

		
