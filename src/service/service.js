const getCookie = (name) => {
  const matches = document.cookie.match(new RegExp(
      '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

class Service {

  async getAcc() {
      const url = 'acc/';
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json' 
        }
      });
      if (!response.ok) {
        //throw new Error(`request failed, HTTP status ${response.status}`);
        const msg = {'errorMessage':'request failed'};
        console.log(msg, getCookie('csrftoken'));  
        return msg;
      }
      const data = await response.json();
      //console.log(data);
      return data;
  }

  async logOut() {
    const url = 'api-auth/logout/';
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    });
    if (!response.ok) {
      const msg = {'errorMessage':'request failed'};
      console.log(msg);  
      return msg;
    }
    const data = response.statusText;
    console.log(data);
    return data;
  }
 
  async authPost(dat) {
    const url = 'api-auth/login/';
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'X-CSRFToken': getCookie('csrftoken'),
      },
      redirect: 'follow',
      referrer: 'no-referrer', // no-referrer, *client
      body: dat
    });
    if (!response.ok) {
      //const msg = {'Post errorMessage':'request failed'};
      const msg = response.statusText;
      //console.log(msg);  
      return msg;
    }
    const data = response.statusText;
    console.log(data);
    return data;
  }
  async getcook() {
    const url = 'api-auth/login/';
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    });
    if (!response.ok) {
      const msg = {'errorMessage':'request failed'};
      console.log(msg);  
      return msg;
    }
    const data = response.statusText;
    console.log(data);
    return data;
  }
  async profUpdate(dat, url){
    const response = await fetch(url, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'X-CSRFToken': getCookie('csrftoken'),
        'Content-type': 'application/json',
      },
      redirect: 'follow',
      referrer: 'no-referrer', // no-referrer, *client
      body: dat
    });
    if (!response.ok) {
      const msg = {'errorMessage':'request failed'};
      console.log(msg);  
      return msg;
    }
    const data = response.statusText;
    console.log(data);
    return data;
  }
}

export default new Service();