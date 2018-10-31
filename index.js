/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Daily Affirmations for an affirmation"
 *  Alexa: "Here's your affirmation: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = "amzn1.ask.skill.351f7322-bdd6-4161-8867-fb1d138e7c05"; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing space facts.
 */
 var WELCOME = [
"Ready to practice a little kindness today? Here's a suggestion: ",
"Acts of kindness bring joy to the giver and receiver. Here's a suggestion: ",
"How about a little kindness today? Here's a suggestion: ",
"Kindness makes the heart happy. Here's a suggestion: ",
"Make the world a better place today. Here's a suggestion: ",
"An act of kindness a day, keeps the blues away. Here's a suggestion: ",
"Try a little kindness. Here's a suggestion: ",
"Don't worry and spread some kindness. Here's a suggestion: ",
"Spread holiday cheer with an act of kindness today. Here's a suggestion: "
 ];

 
var KINDNESS = [
	"Next time you are in a drive through, pay for the order that is behind you. ",
	"If you pay cash for a toll, pay the toll for the person behind you.",
	"When you are at a restaurant, consider tipping 30 or more percent and write a kind note on the bill.",
	"Set an intention from now until the end of the day, to smile everytime you see someone or walk by them in passing. Do this no matter who they are.",
	"Say thank you to people you see everyday that provide a service, think of the janotorial staff, the security guards, the parking attendant. Make gratitude your first thought.",
	"Make an effort to compliment people you encounter today. Compliment the work they are doing, how they are acting, or what they are saying. You can always resort to complimenting on how someone looks, but make the attempt to look deeper and acknolegde that in those you come in contact with today.",
	"This is a great family activity. Send postcards, letters or cards to children who are sick and hoping for mail. Visit sendkidstheworld.com to learn how you can encourage and inspire those children.",
	"Make a easy and inexpensive holiday craft with the family. For example, you can buy a bunch of candy canes, red fuzz balls, and brown pipe cleaners and make little holiday reindeers. Once you have 50 or so, take them to a church, or a nearby retirement home and deliver them. ",
	"Make an inexpensive holiday gift basket for your neighbors and deliver them to the door. You can shop at the local store that sells things for a dollar and pick up hot cocoa, candy, ornaments or anything that might help people get into the spirit of the season. ",
	"Grab a couple sticky notes and write some kind, uplifting words on them. You can write things like, You are Amazing! Or, The world is better because of you, and stick them on the mirrors in the restroom at your work or in your house.",
	"Go to a store that sells balloons for a dollar and buy a bunch of helium filled balloons. Then go to the mall or public place and hand them out to the children you see. Be sure to ask the parents if its ok, and let them know that there's no catch, just an act of kindness.",
	"Here's a good one for the family, make a batch of thank you cards and take them to the local Veterans Administration or VA Hospital and hand them out, while saying, thank you so much for your service. Attach a piece of candy or treat bag for an added smile.",
	"Next time you write an email, make a point to compliment the person you are writing to.",
	"When dining out, pay attention to the server's name and use it kindly. When they give you the survey at the end of the meal, complete it this time and be sure to mention the great service of your server by name.",
	"Create a Kindness and Gratitude Wall. Find a local merchant with a large front window. Partner with them to create a kindness and gratitude wall, allowing passersby to use a dry erase marker to spread a message of cheer and kindness on the glass wall. Try your local FroYo or novelty store.",
	"Find a public wish list on Amazon.com and buy something for someone you don't know. Imagine the joy you would feel to have a stranger send you an item you have been hoping for. Bring that same joy to someone else. ",
	"The next time you are out shopping or running errands, keep some extra change in your pocket and check out the expired parking meters. Use your spare change to make someone's day by saving them a parking ticket.",
	"Create a new tradition at home or at work. Try Tasty Tuesday. Every Tuesday during this holiday season, bake a treat and share it with you family and or those you work with. Before you know it, others in the office might join in! ",
	"Next time you are in line at the grocery store or retail checkout, take a look around. Do you see someone who might benefit from going before you? Then offer to switch places with them in line.",
	"If you still use vending machines that take cash and give back change, leave the change in the vending machine for the next person. It will be a nice surprise. ",
	"This holiday season you will likely get an invitation to a recital, pageant or event. Make a point this year to attend the event, as it will bring joy to the person who asked you to be there.",
	"Call or visit your oldest living relative this holiday season. Make it a point to let them know how much you love and care for them. ",
	"Take a moment to forgive. Forgive anyone who has recently said something or has done something that hurt you. Take a deep breath, smile, and let it go. The next time you see this person, treat them as if they had never hurt you. I know, this is a tough one.",
	"Show affection to those you love. Take a moment, while dining, having coffee, at the movies, where ever you are and reach over and show affection towards the person you are with. Let them know how much you love them and appreciate them.",
	"Be kind to the planet. This holiday season, shop with useable shopping bags and pay attention to how you can recycle, reduce and reuse items this season.",
	"Be Kind to yourself. Find out if your building has quiet rooms. If they have them, use them at least once a day throughout this season. If your building does not have a quiet room, take time away from your desk, and not while eating, to sit quietly. Spend time with yourself and allow your mind to become still, even if only for a few minutes.",
	"Be kind to yourself. Make sure you use all the vacation days given to you this year. Don't let them expire. You will be happier and kinder for it.",
	"On the next trash day, be nice to your neighbor and take in their trash bins when you take in yours.",
	"Next time you are eating out, look around for a table that is just finishing up their meal and tell the server you would like to buy that table a dessert of their choice. Make it anonymous.",
	"Take time to volunteer this season, volunteer with the Special Olympics. Help people with disabilities continue their sports training all year long by volunteering your time to a great cause.",
	"Take a look at your professional network, see if there is someone you can write a recommendation for and write it. Take the time to think about how their worked may have helped you and write a detailed recommendation that could help their career. ",
	"Create a gift for the homeless. Take a gallon zipper locked bag and add a washcloth, toothbrush, socks, hand sanitizer and some snacks. If you can, throw in a 5-dollar bill. Hand these to the homeless people you come in contact with, and share this gift with a smile.",
	"Spend an afternoon with your family or loved ones and make some handmade cards for your family and friends. Send them out the same day.",
	"Grab a reusable container and use it to collect spare change you collect over the holidays. Then when it is full, take to a local charity or church and donate it.",
	"While shopping in the toy aisles this season, take a moment to straighten up the shelves near where you are browsing. ",
	"Start a holiday kindness blog. Write about kindness ideas and how implementing them changed your experience during the holidays."



];


/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * ChristmasKindness is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var ChristmasKindness = function() {
	AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
ChristmasKindness.prototype = Object.create(AlexaSkill.prototype);
ChristmasKindness.prototype.constructor = ChristmasKindness;

ChristmasKindness.prototype.eventHandlers.onSessionStarted = function(sessionStartedRequest, session) {
	console.log("ChristmasKindness onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
	// any initialization logic goes here
};

ChristmasKindness.prototype.eventHandlers.onLaunch = function(launchRequest, session, response) {
	console.log("ChristmasKindness onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
	handleNewKindnessRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
ChristmasKindness.prototype.eventHandlers.onSessionEnded = function(sessionEndedRequest, session) {
	console.log("ChristmasKindness onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
	// any cleanup logic goes here
};

ChristmasKindness.prototype.intentHandlers = {
	"GetNewKindnessIntent": function(intent, session, response) {
		handleNewKindnessRequest(response);
	},
	"AMAZON.HelpIntent": function(intent, session, response) {
		response.ask("The Christmas Kindness Skill provides you with daily ideas about how you can bring more kindness to your family, your workplace and your community. You can say tell me an idea or, you can say exit... What can I help you with?", "What can I help you with?");
	},
  "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Thanks for using Christmas Kindness. Practice kindness daily and change the world!";
        response.tell(speechOutput);
  },

  "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Thanks for using Christmas Kindness. Practice kindness daily and change the world!";
        response.tell(speechOutput);
  }

};
/**
 * Gets the definition of Affirmation and returns to the user.


function handleDefineAffirmationRequest(response) {

	// Create speech output
	var speechOutput = "Affirmations are proven methods of re-wireing your brain and provide a way for you to consciously control what you think about. Affirmations improve the level of feel-good hormones and help you break the patterns that negative thoughts can cause. ";

	response.tellWithCard(speechOutput, "Daily Affirmations", speechOutput);
};
/**
 * Gets a random affirmation from the list and returns to the user.
 */

function handleNewKindnessRequest(response) {
	// Get a random act of kindness from the kindness list
	var kindnessIndex = Math.floor(Math.random() * KINDNESS.length);
	var kindness = KINDNESS[kindnessIndex];

// Get a random welcome message from the WELCOME list
	var welcomeIndex = Math.floor(Math.random() * WELCOME.length);
	var welcome = WELCOME[welcomeIndex];

	// Create speech output
	var speechOutput = welcome + kindness;

	response.tellWithCard(speechOutput, welcome, speechOutput);
};

// Create the handler that responds to the Alexa Request.
exports.handler = function(event, context) {
	// Create an instance of the ChristmasKindness skill.
	var christmasKindness = new ChristmasKindness();
	christmasKindness.execute(event, context);
};
