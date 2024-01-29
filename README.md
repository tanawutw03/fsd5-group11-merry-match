# fsd5-group11-merry-match

## Description

Merry Match is a new generation of online dating website for everyone, whether you’re committed to dating, meeting new people, expanding your social network, meeting locals while traveling, or even just making a small chat with strangers. This site allows you to make your own dating profile, discover new people, save favorite profiles, and let them know that you’re interested. If you’re here to meet new people, expand your social network, or meet locals when you’re traveling, Merry Match is the right place for you!

## Required Scopes

1. Authentication
2. CRUD Modules
3. Data Searching
4. Image Uploading

## System Requirements

Sprint #1 (Mostly)

- Landing Page
- Authentication

**As** u**sers, they:**

1. can create their dating profile upon registering to the site.
   - A registration form should include:
     1. Name
     2. Age
     3. Hobbies/Interests
     4. Location
     5. Sexual identities (male, female, non-binary, etc.)
     6. Sexual preferences (male, female, non-binary, etc.)
     7. Racial preferences (Asian, Caucasian, Black, etc.)
     8. Meeting interests (friends, partners, long-term commitment, etc)
     9. Username
     10. Email
     11. Password
2. can upload pictures to their profile (up to 5 pictures)
3. can view/edit their profile information.
   - A profile information should include:
     - Name
     - Age
     - Hobbies/Interests
     - Location
     - Sexual identities (male, female, non-binary, etc.)
     - Sexual preferences (male, female, non-binary, etc.)
     - Racial preferences (Asian, Caucasian, Black, etc.)
     - Meeting interests (friends, partners, long-term commitment, etc)
     - Username
     - Email
     - Purchase History
4. can log in and log out from their profile via registered username or email.
5. can view other users’ profiles.
   - Information:
     - Name
     - Age
     - Hobbies/Interests
     - Location
     - Sexual identities (male, female, non-binary, etc.)
     - Sexual preferences (male, female, non-binary, etc.)
     - Racial preferences (Asian, Caucasian, Black, etc.)
     - Meeting interests (friends, partners, long-term commitment, etc)
6. can search other users’ profiles by using filters:
   - Age range
   - Meeting Interests
   - Keywords (name, hobbies, sexual preferences, etc.) optional
7. can ‘merry’ other favorite profiles to add them into a Merry List, which has limit up to 20 likes per day.
8. can send messages to other profiles (only when both are in each other’s Merry List - might end up referring to third-party apps).
9. can remove unwanted profiles from your Merry List.
10. can delete their own dating profile (account).
11. can subscribe/unsubscribe to Merry Packages, which allows the users to ‘merry’ more than a daily limited number — for only users with Merry packages
12. can pay for different Merry Packages using a credit card
13. can submit complaints to admins via a provided form, which consists of:
    - Issue
    - Description
    - Date submitted

**As admins, they:**

1. can CRUD (Create, Read, Update, Delete) Merry Packages.
2. can log into/log out from their accounts.
3. can view customers’ complaints (CRM).
4. can take action on the given complaints (resolved, pending, canceled).

Figma: https://www.figma.com/file/hrHQRTVfoR2fiYwjQCHHWG/Merry-Match?node-id=0%3A1

## Stacks

    React
    Node.js
    PostgreSQL

## Packages

client

- npm i axios
- npm i react-router-dom
- npm i react-hook-form
- npm i react-tinder-card
- npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion

server

- npm install @supabase/supabase-js
