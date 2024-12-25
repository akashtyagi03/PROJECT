document.addEventListener("DOMContentLoaded", function(){

    const searchbutton = document.getElementById("search");
    const usernameinput = document.getElementById("user-input");
    const statscontainer = document.querySelector(".stats-container"); 
    const easyprogresscircle = document.querySelector(".easy-progress"); 
    const meadiumprogresscircle = document.querySelector(".medium-progress"); 
    const hardprogresscircle = document.querySelector(".hard-progress"); 
    const easylabel = document.   querySelector("easy-label"); 
    const mediumlabel = document.querySelector("medium-label"); 
    const hardlabel = document.querySelector("hard-label"); 
    const cardstatscontainer = document.querySelector(".stats-cards");

    // return true or false based on a regular-expresion
    function validateuser(username){
        if(username.trim() === ""){
            alert("username should not be empty");
            return false;
        }
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const ismatching = regex.test(username);
        if(!ismatching){
            alert("invalid username");
        }
        return ismatching; 
    }   
    
    async function fetchuserdetail(username){  

        try{
            searchbutton.textContent = "searching...";
            searchbutton.disabled = true;
            //statsContainer.classList.add("hidden");

            // const response = await fetch(url);
            const proxyUrl = 'https://cors-anywhere.herokuapp.com/' 
            const targetUrl = 'https://leetcode.com/graphql/';
            
            const myHeaders = new Headers();
            myHeaders.append("content-type", "application/json");

            const graphql = JSON.stringify({
                query: "\n    query userSessionProgress($username: String!) {\n  allQuestionsCount {\n    difficulty\n    count\n  }\n  matchedUser(username: $username) {\n    submitStats {\n      acSubmissionNum {\n        difficulty\n        count\n        submissions\n      }\n      totalSubmissionNum {\n        difficulty\n        count\n        submissions\n      }\n    }\n  }\n}\n    ",
                variables: { "username": `${username}` }
            })
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: graphql,
            };

            const response = await fetch(proxyUrl+targetUrl, requestOptions);
            if(!response.ok) {
                throw new Error("uable to fetch the user details");
            }
            const parsedData = await response.json();
            console.log("logging data : ", parsedData);
            displayuserdata(parseddata);    
        }
        catch(error) {
            statscontainer.innerHTML = `<p>NO data</p>`
        }
        finally {
            searchbutton.textContent = "search"
            searchbutton.disabled = false;
        }
    }

    function updateprogress(soloved, total, label, circle){
        const progressdegree = (soloved/total)+100;
        circle.style.setproperty("--progree-degree", `${progressdegree}%`);
        label.textContent = `${soloved}/${total}`;
    }

    function displayuserdata(data){
        const totalques = parseddata.data.allquestioncount[0].count;
        const totaleasyques = parseddata.data.allquestioncount[1].count;
        const totalmediumques = parseddata.data.allquestioncount[2].count;
        const totalhardques = parseddata.data.allquestioncount[3].count;

        const solvedtotalques = parseddata.data.matcheduser.submitstats.acsubmission[0].count; 
        const solvedtotaleasyques = parseddata.data.matcheduser.submitstats.acsubmission[1].count; 
        const solvedtotalmediumques = parseddata.data.matcheduser.submitstats.acsubmission[2].count;  
        const solvedtotalhardques = parseddata.data.matcheduser.submitstats.acsubmission[3].count;  

        updateprogress(solvedtotaleasyques, totaleasyques, easylabel, easyprogresscircle);
        updateprogress(solvedtotaleasyques, totaleasyques, easylabel, easyprogresscircle);
        updateprogress(solvedtotaleasyques, totaleasyques, easylabel, easyprogresscircle);

        const cardsData =[
            {label: "Overall Submissions", value:parsedData.data.matchedUser.submitStats.totalSubmissionNum[0].submissions },
            {label: "Overall Easy Submissions", value:parsedData.data.matchedUser.submitStats.totalSubmissionNum[1].submissions },
            {label: "Overall Medium Submissions", value:parsedData.data.matchedUser.submitStats.totalSubmissionNum[2].submissions },
            {label: "Overall Hard Submissions", value:parsedData.data.matchedUser.submitStats.totalSubmissionNum[3].submissions },
        ]
        
        console.log("card ka data: " , cardsData);

        cardStatsContainer.innerHTML = cardsData.map(
            data => 
                    `<div class="card">
                    <h4>${data.label}</h4>
                    <p>${data.value}</p>
                    </div>`
        ).join("")
    }

    searchbutton.addEventListener('click', function(){
        const username = usernameinput.value;
        console.log("loggin username: ", username)
        if(validateuser(username)){
            fetchuserdetail(username);
        }
    })

})