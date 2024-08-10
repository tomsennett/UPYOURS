UPYOURS['html'] = function()
{
    let num = 3.5;
    let count = document.querySelectorAll('.aTeam:not(.prototype)').length;
    if (count>2)
        num = 3;
    if (count>3)
        num = 2.5;
    this.style.fontSize = 'calc(((1vh + 1vw)/2)*'+num+')';
}

//Functionality for all buttons, which detects both touch and mouse events intelligently and can be checked for a 'click' with this.wasTouched
UPYOURS["button"] = function()
{
    this.wasTouched = false;

    if (this.cooldown > 0)
        this.cooldown--;
    else
    {
        if (this.event_touchstart || this.event_mousedown)
        {
            this.classList.add('touched');
        }

        if (this.event_touchend || this.event_mouseup || this.event_touchcancel)
        {
            if (this.classList.contains('touched'))
            {
                this.wasTouched = true;
                this.cooldown=3;
                this.classList.remove('touched');
            }
        }
    }
}

//Wait for CSS transition to finish and then remove the element
UPYOURS[".destroying"] = function()
{
    this.disabled=true;

    if (this.event_transitionend)
    {
        if (this.event_transitionend.propertyName==="opacity")
            this.remove();
    }

    if (this.event_transitioncancel)
    {
        this.remove();
    }
    
}
    

//Numpad buttons
UPYOURS[".numButton"] = function()
{
    if (this.myNumber === undefined) 
    {
        this.myNumber = this.dataset.val;
    }

    this.innerHTML = this.myNumber;

    if (this.wasTouched)
    {
        let theDisplay = document.querySelector('.theDisplay');
        
        let str = theDisplay.myString;
        if (str.length==3)
            str = str.substring(1);
        str+=""+this.myNumber;

        theDisplay.myString = str;
    }
}

//Clear button
UPYOURS[".clearButton"] = function()
{
    if (this.wasTouched)
    {        
        let theDisplay = document.querySelector('.theDisplay');
        theDisplay.myString = "000";
    }

    if (document.querySelector('.theDisplay').myString==="000")
    {
       this.disabled = true;
    }
    else
    {
        this.disabled = false;
    }
}

//Team score display
UPYOURS[".teamScore"] = function()
{
    if (this.myScore === undefined) 
    {
        this.myScore = 501;
    }

    this.querySelector("h1").innerHTML = this.myScore;
}

//Enter button for team score
UPYOURS[".teamScoreEnterButton"] = function()
{
    if (this.wasTouched)
    {
        let theDisplay = document.querySelector('.theDisplay');
        let displayNum = parseInt(theDisplay.myString);

       // this.parentNode.myScore-=displayNum;

        let myTeam = this.closest('.aTeam');
        const teamScoreDisplays = document.querySelectorAll('.aTeam');
        const teamScoreDisplaysWithColorIndex2 = Array.from(teamScoreDisplays).filter(display => display.myColorIndex === myTeam.myColorIndex);

        teamScoreDisplaysWithColorIndex2.forEach(function(e)
        {
            e.querySelector('.teamScore').myScore-=displayNum;
        });

        document.querySelectorAll('.turnButton').forEach(function(e)
        {
            e.classList.remove('last');
        });

        let turnButton = document.querySelector('.turnButton.prototype');
        let newTurnButton = turnButton.cloneNode(true);
        newTurnButton.classList.remove('prototype');
        newTurnButton.myNumber = displayNum;
        newTurnButton.classList.add('last');

        this.parentNode.parentNode.querySelector(".aTurnList").prepend(newTurnButton);
        
        theDisplay.myString = "000";
    }

}


//Undo button for turn
UPYOURS[".turnButton"] = function()
{    
    var str = ""+this.myNumber;
    if (str.length==1)
        str="&nbsp;&nbsp;"+str;
    else if (str.length==2)
        str="&nbsp;"+str;

    
    this.innerHTML = "&#10554; "+str;

    if (this.wasTouched)
    {
       // if (confirm("Remove "+this.myNumber+"?"))
        //{
            this.parentNode.parentNode.querySelector('.teamScore').myScore+=this.myNumber;
            this.classList.add('destroying');
            document.querySelector(".theDisplay").myString = "000";
        //}
    }


    if (this.classList.contains('destroying'))
    {
    }
    else
    {
        var siblings = Array.from(this.parentNode.children);
        var index = siblings.indexOf(this);

        this.classList.remove('collapsed');
        
        if (index==1)
        {
            this.style.transform = "scale(.75)";
            this.style.marginTop="-5%";
        }
        else if (index==2)
        {
            this.style.transform = "scale(.5)";
            this.style.marginTop="-15%";
        }
        else if (index>=3)
        {
            this.style.transform = "scale(0)";
            this.style.marginTop="0";
            this.classList.add('collapsed');
        }
    }

        
    
}

//Display for the numpad
UPYOURS[".theDisplay"] = function()
{
    if (this.myString === undefined) 
    {
        this.myString = "000";
    }

    if (this.myString == "000")
        this.classList.add('disabled');
    else   
        this.classList.remove('disabled');

    this.innerHTML = this.myString;
}

//Hide and show the add/remove team buttons
UPYOURS[".addTeamButton, .removeTeamButton"] = function()
{
    if (document.querySelectorAll('.turnButton:not(.prototype)').length>0)
    {
        this.classList.add('collapsed');
    }
    else
        this.classList.remove('collapsed');
}

//Add a new team
UPYOURS[".addTeamButton"] = function()
{
    let noTeams = document.querySelectorAll('.aTeam:not(.prototype)').length==0;

    if (this.wasTouched || noTeams)
    {
        let theTeams = document.querySelector('.theTeams');
        let newTeam = document.querySelector('.aTeam.prototype').cloneNode(true);
        newTeam.classList.remove('prototype');
        theTeams.append(newTeam);
    }
    
    let theDisplay = document.querySelector('.theDisplay');

    if (theDisplay.myString==="000")
    {
        this.disabled = false;
    }
    else
    {
        this.disabled = true;
    }
}


//Remove a team
UPYOURS[".removeTeamButton"] = function()
{
    if (this.wasTouched && !this.classList.contains('collapsed'))
    {
           let teams = document.querySelectorAll('.aTeam:not(.prototype)');
           teams[teams.length-1].classList.add('destroying');
    }
    

   if (document.querySelectorAll('.aTeam:not(.prototype)').length==1 || 
   document.querySelectorAll('.turnButton:not(.prototype)').length>0 ||
   document.querySelector('.theDisplay').myString!=="000")
    {
        this.disabled=true;
    }
    else
    {
        this.disabled=false;
    }

}


//Reset button
UPYOURS[".resetButton"] = function()
{
    if (this.wasTouched)
    {
        if (confirm("Are you sure you want to quit?"))
        {
           window.location.reload();
        }
    }
}

//Team color
UPYOURS[".aTeam"] = function()
{
    if (this.myColorIndex === undefined)
    {
        this.myColorIndex = (document.querySelectorAll('.aTeam:not(.prototype)').length-1) % 4;
    }

    let colors = ["var(--blue)", "var(--red)", "var(--green)", "var(--orange)"];
    if (this.myColorIndex>=colors.length)
        this.myColorIndex = 0;
    if (this.myColorIndex<0)
        this.myColorIndex = colors.length-1;
    this.myColor = colors[this.myColorIndex];

    this.querySelector('h1').style.color = this.myColor;
    this.querySelector('.teamScoreEnterButton').style.backgroundColor = this.myColor;
    this.querySelector('.turnButton').style.borderColor = this.myColor;
    this.querySelector('.turnButton').style.color = this.myColor;
    this.querySelector('.changeColor.left').style.borderColor = this.myColor;
    this.querySelector('.changeColor.left').style.color = this.myColor;
    this.querySelector('.changeColor.right').style.borderColor = this.myColor;
    this.querySelector('.changeColor.right').style.color = this.myColor;
}


UPYOURS[".changeColor"] = function()
{
    let theDisplay = document.querySelector('.theDisplay');
    if (theDisplay.myString==="000")
    {
        this.disabled = false;
    }
    else
    {
        this.disabled = true;
    }

    if (document.querySelectorAll('.turnButton:not(.prototype)').length==0)
    {
        if (this.event_click)
        {
            let inc = 1;
            if (this.classList.contains('left'))
                inc = -1;
            this.closest('.aTeam').myColorIndex+=inc;
        }

        this.classList.remove('collapsed');
    }
    else
    {
        this.classList.add('collapsed');
    }
}
