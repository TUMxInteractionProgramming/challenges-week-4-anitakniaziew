/* #6 start the #external #action and say hello */
console.log("App is alive");

var currentLocation = {
    longitude: 21.005505785231662,
    latitude: 52.1976303,
    what3words: "rybki.ramka.gardło"
};

/**
 * #6 #Switcher function for the #channels name in the right app bar
 * @param channel Text which is set
 */
function switchChannel(channel) {

    //store reference of the selected channel's object in variable
    currentChannel = channel;

    //Log the channel switch
    console.log("Tuning in to channel", channel);

    //Write the new channel to the right app bar
    document.getElementById('channel-name').innerHTML = channel.name;

    //#6 change the #channel #location
    document.getElementById('channel-location').innerHTML = 
        'by <a href="https://map.what3words.com/' + channel.createdBy + '" target="_blank"><strong>' + channel.createdBy + '</strong></a>';

    /* #6 #liking channels on #click */
    channel.starred === true ? $('#channel-star').attr('class', 'fas fa-star') 
        : $('#channel-star').attr('class', 'far fa-star');

    /* #6 #highlight the selected #channel.
       This is inefficient (jQuery has to search all channel list items), but we'll change it later on */
    $('#channels li').removeClass('selected');
    $('#channels li:contains(' + channel.name + ')').addClass('selected');
}

/* #6 #liking a channel on #click */
function star() {
    $('#channel-star').toggleClass("fas far");
    currentChannel.starred = !currentChannel.starred;
    $('#channels li.selected i.fa-star').toggleClass("fas far");
}

/**
 * #6 #taptab selects the given tab
 * @param tabId #id of the tab
 */
function selectTab(tabId) {
    // #6 #taptab #remove selection from all buttons...
    $('#tab-bar button').removeClass('selected');

    //...#6 #taptab #log the new tab on change...
    console.log('Changing to tab', tabId);

    //...#6 #taptab #add selection to the given tab button, its id is passed via the #argument tabId
    $(tabId).addClass('selected');
}

/**
 * #6 #toggle (show/hide) the emojis menu #smile
 */
function toggleEmojis() {
    /* $('#emojis').show(); // #show */
    $('#emojis').toggle(); // #toggle
}

/**
 *  messeges constructor
 */
function Message(text) {
    this.createdBy = currentLocation.what3words; 
    this.latitude = currentLocation.latitude;
    this.longitude = currentLocation.longitude;

    var dInMilSec = Date.now(); // generates actual date in milieconds
    var d = new Date(dInMilSec); // converts actual date into an object
    var datestring = ("0" + d.getDate()).slice(-2) + "." + 
        ("0"+(d.getMonth()+1)).slice(-2) + "." + d.getFullYear() + ", " +
        ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + 
        ("0" + d.getSeconds()).slice(-2); //generates string from the date object
    this.createdOn = datestring;
    var expiration = dInMilSec + 15*60*1000; //generates date of message expiration in miliseconds
    this.expiresOn = new Date(expiration);

    this.text = text;
    this.own = true;
}

function sendMessage() {
    var text = $('#new-message').val();
    var message = new Message(text);
    var messageElement = createMessageElement(message);
    $('#messages').append('<div>' + messageElement + '</div>');
    $('#new-message').val('');
    console.log(message);
}

function createMessageElement(messageObject) {
    var actualTime = new Date(Date.now()); //generates actual time
    var difference = messageObject.expiresOn.getTime() - actualTime.getTime() //calculates milliseconds left to message expiration
    var expiresIn = Math.round(difference/6/10000); //converts time left to expiration in millisecs to minutes
    return '<div class="message">' +
        '<h3><a href="https://map.what3words.com/' + messageObject.createdBy + '" target="_blank"><strong>' + 
        messageObject.createdBy +'</strong></a>' + messageObject.createdOn + 
        ' <em>' + expiresIn + ' min. left</em></h3>' + '<p>' + messageObject.text + '</p>' 
        '<button>+5 min.</button>' +
    '</div>';
}


function listChannels() {
    var createYummy = createChannelElement(yummy)
    var createSeven = createChannelElement(sevenContinents)
    var createKiller = createChannelElement(killerApp)
    var createFirst = createChannelElement(firstPersonOnMars)
    var createOctober = createChannelElement(octoberfest)
    $('#channels-list').append(createYummy);
    $('#channels-list').append(createSeven);
    $('#channels-list').append(createKiller);
    $('#channels-list').append(createFirst);
    $('#channels-list').append(createOctober);
}

function createChannelElement(channelObject) {
    return '<li onclick="switchChannel(channelObject.name)">' + 
        channelObject.name + '<span class="channel-meta">' + starDisplay() + 
        '<i class="fas fa-chevron-right"></i></span></li>';
    function starDisplay() {
        if (channelObject.starred === true) {
            return '<i class="fas fa-star"></i>'
        } else {
            return '<i class="far fa-star"></i>'
        }
    };
}
