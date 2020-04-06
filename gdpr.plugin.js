document.addEventListener("DOMContentLoaded", function(event) { 
    const style = {
        popup: `
            position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);height:50%;width:60%;background:#ffffff;max-width:500px;
        `,
        headline: `
            justify-content:center;display:flex;align-items:center;margin:0;height:10%;font-size:20px;box-shadow:0 2px 9px -6px black;
        `,
        button: `
            width:50%;cursor:pointer;font-size:15px;background:transparent;border-top:none;border-bottom:none;border-left:1px solid #0000001a;border-right:1px solid #0000001a;
        `,
        container: `
            display:flex;height:10%;box-shadow: 0 2px 9px -6px black;
        `,
        popupBody: `
            height:80%;overflow:auto;
        `,
        scrollStopper: `
            margin:0;height:100%;overflow:hidden;
        `,
        segment: `
            padding: 5px 10px; display: flex;align-items: center;justify-content: space-between;background: #8080800f;box-shadow: 0 2px 6px -6px black;
        `,
        segmentInput: `
            
        `,
        interactiveContainer: `
            display: flex;align-items: center;width: 25%;justify-content: space-evenly;
        `,
        policy: `
            padding-right:10px;border-right: 2px solid #0000001f;
        `
    }

    const api = 'https://api.optad360.com/vendorlist' 
    const body = document.body
    let popup;
    let popupbody;

    const state = {
        partners: []
    }
   
    async function getvendorlist() {
        const response = await fetch(api);
        return await response.json()
    }

    const vendorlist = getvendorlist()
        .then(data => {
            createTable(data)
    }); 
    
    const createTable = (data) => {
        for(let partner of data.vendors) {
            popupBody.append(partnerSegment(partner));
        }
    } 

    const partnerSegment = (partner) => {
        const segment = document.createElement('div');
        const partnerName = document.createElement('p'); 
        const interactiveContainer = document.createElement('div');
        const link = document.createElement('a');
        const input = document.createElement('input');
        const inputText = 'policy'
        partnerName.innerHTML = partner.name;
        link.innerHTML =  inputText;
        link.setAttribute('href', `${partner.policyUrl}`)
        link.setAttribute('style', `${style.policy}`);
        input.setAttribute('type', 'checkbox');
        input.setAttribute('style', `${style.segmentInput}`);
        input.onclick = () => {
            setState(partner)
        }

        interactiveContainer.append(link, input)
        interactiveContainer.setAttribute("style", `${style.interactiveContainer}`);
        segment.setAttribute("style", `${style.segment}`);
        segment.append(partnerName, interactiveContainer)
        return segment;
    } 

    const setState = (partner) => {
        if(state.partners.includes(partner)) {
            state.partners = state.partners.filter(partnerChecked => partner.id != partnerChecked.id)
        }
        else {
            state.partners = [...state.partners, partner]
        }
    }

    const handleClick = decision => {
        if(decision === 'accept') {
           setCookie();
        }
        removePopup()
    }

    const setCookie = () => {
        const cname = 'Partners'
        const cvalue = JSON.stringify(state.partners);
        const date = new Date();
        date.setTime(date.getTime() + (1*24*60*60*1000));
        var expires = "expires=" + date.toGMTString();
        document.cookie = `${cname}="${cvalue};${expires};path=/`;
    }

    const isCookieActive = () => {
        if(getCookieByName('Partners'))
            return true;
        return false;
    }

    const getCookieByName = cname => {
        const name = `${cname}=`;
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    }

    const isSiteSafe = () => {
        if (location.protocol === 'https:')
            return true;
        return false;
    }

    const createPopup = () => {
        const headlineText = `GDPR consent`;
        const acceptText = `Accept`;
        const declineText = `Decline`;
    
        popup = document.createElement('div');
        const headline = document.createElement('h5');
        popupBody = document.createElement('div');
        const container = document.createElement('div');
        const acceptButton = document.createElement('button');
        const declineButton = document.createElement('button');

        popup.setAttribute("style", `${style.popup}`);
        headline.setAttribute("style", `${style.headline}`);
        popupBody.setAttribute("style", `${style.popupBody}`);
        container.setAttribute("style", `${style.container}`);
        acceptButton.setAttribute("style", `${style.button}`);
        declineButton.setAttribute("style", `${style.button}`);

        acceptButton.innerHTML = acceptText;
        acceptButton.onclick = () => {
            handleClick('accept')
        };
        declineButton.innerHTML = declineText;
        declineButton.onclick = () => {
            handleClick('decline')
        };

        container.append(acceptButton, declineButton);
        headline.appendChild(document.createTextNode(`${headlineText}`));
        popup.append(headline, popupBody, container)
    }

    removePopup = () => {
        body.removeChild(popup);
        document.body.removeAttribute("style", `${style.scrollStopper}`);// usunac class zamiast tego
    }

    showPoput = () => {
        body.appendChild(popup);
        document.body.setAttribute("style", `${style.scrollStopper}`); // dodac class zamiast tego
    }
    
    if(isSiteSafe()) {
        if(!isCookieActive()) {
            document.cookie = 'Partners' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            createPopup();
            showPoput();
        }
    }
    
});
   