import axios from 'axios';
import { API_BASE_URL } from '../../Constants'
const Api = {}
// for register
Api.RegisterApi = (user) => {
  return axios.post(`${API_BASE_URL}/rest-auth/registration/`, user)
}
// for login
Api.LoginApi = (loginuser) => {
  return axios.post(`${API_BASE_URL}/rest-auth/login/`, loginuser)
}

Api.StartCampaignApi = (data, token) => {
  return axios({
    method: 'POST',
    url: `${API_BASE_URL}/campaign/start/`,
    data: {
      title: data.title,
      from_address: data.from_address
    },
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
}
// for campaign_recipient 
Api.RecipientApi = (recipientData, token) => {
  const formData = new FormData();
  formData.append('csvfile_op1', recipientData.csvfile_op1);
  formData.append('email', recipientData.email);
  formData.append('option', recipientData.option);
  formData.append('campaign', recipientData.campaign)
  console.log('rec api', formData);
  return axios({
    method: 'POST',
    url: `${API_BASE_URL}/campaign/recipients/`,
    data: formData,
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
}

// for campaign_option api
Api.OptionApi = (optionData, token) => {
  console.log('OptionAPI------:', optionData);
  return axios({
    method: 'PUT',
    url: `${API_BASE_URL}/campaign/options/`,
    data: {
      ...optionData
    },
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
}
// for campaign_compose

Api.CampaignComposeApi = (token, data) => {
  return axios({
    method: 'POST',
    url: `${API_BASE_URL}/campaign/message/`,
    data: data,
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
}

// campaign GET preview
Api.CampaignPreviewApi = (token, id) => {
  return axios({
    method: 'GET',
    url: `${API_BASE_URL}/campaign/personalize/${id}/`,
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
}



// CAMPAIGN UPDATE PREVIEW
Api.CampaignUpdatePreviewApi = (token, id) => {
  return axios({
    method: 'PUT',
    url: `${API_BASE_URL}/campaign/personalize/2/`,
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
}

// campaign_savecampaign (put)
Api.CampaignSaveApi = (token, id, saveData) => {
  return axios({
    method: 'PUT',
    data: {
      startCampaign: saveData
    },
    url: `${API_BASE_URL}/campaign/savecamp/${id}/`,
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
}

// campaign leadcatcher
Api.CampaignLeadCatcherApi = (token,id, leadData) => {
  console.log('m id hu --->',id)
  return axios({
    method: "POST",
    url: `${API_BASE_URL}/campaign/settings-leadcatcher/`,
    data: {
        campaign:id,
        of_times:leadData.of_times,
        leadcatcher_recipient:leadData.leadcatcher_recipient

    },
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
}

// LEAD CATCHER GET DATA
Api.CampaignLeadGetApi = (token, id) => {
  return axios({
    method: 'GET',
    data:{
      campaign:id
    },
    url: `${API_BASE_URL}/campaign/settings-leadcatcher/`,
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
}

// campaign get-overview
Api.CampaignOverviewApi = (token, id) => {
  return axios({
    method: 'GET',
    url: `${API_BASE_URL}/campaign/overview/${id}/`,
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
}
// campaign recipient people (get)
Api.CampaignRecipientPeopleApi = (token,id) => {
  return axios({
    method: 'GET',
    url: `${API_BASE_URL}/campaign/recipients/people/${id}/`,
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
}

// campaign recipient peoples (put)
Api.CampaignRecipienPutPeople = (token) => {
  return axios({
    method: 'PUT',
    url: `${API_BASE_URL}/campaign/recipients/people/1/`,
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
}

// campaign recipient (put) (api for update recipient details)   
// its not working
Api.CampaignUpdateRecipient = (token, data) => {
  return axios({
    method: 'PUT',
    url: `${API_BASE_URL}/campaign/recipients/1/`,
    data: {
      'campaign': 1,
      'email': 'developer@externlabs.com',
      'password': 'developer@externlabs'
    },
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })

}

// campaignmessage
Api.CampaignMessage = (token) => {
  return axios({
    method: 'GET',
    url: `${API_BASE_URL}/campaign/campaign-message/1/`,
    data: {

    },
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
}

// campaign prospects
Api.CampaignProspects = (token) => {
  return axios({
    method: 'GET',
    url: `${API_BASE_URL}/campaign/prospects/`,
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
}

// ONCLICK PRSPECT
Api.CampaignOnclickProspects = (id, token) => {
  return axios({
    method: 'GET',
    url: `${API_BASE_URL}/campaign/prospects/${id}/`,
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
}

// user settings
Api.UserSetting = (token) => {
  return axios({
    method: 'GET',
    url: `${API_BASE_URL}/users/user-setting/`,
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
}

// update user setting
Api.UserUpdateSetting = (token, data) => {
  return axios({
    method: 'PUT',
    url: `${API_BASE_URL}/users/user-setting/`,
    data: {
      'full_name': 'omaidf',
      'email': 'omaid123@gmail.com'
    },
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
}

// change password
// not working
Api.ChangePassword = (token, data) => {
  return axios({
    method: 'PUT',
    url: `${API_BASE_URL}/users/change-password/`,
    data: {
      'old_password': 'keshav@9784',
      'new_password': 'keshav@7014',
      'new_confirm_password': 'keshav@7014',
    },
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
}

// mail sender delete
// Api.MailSenderDelete = (token) => {
//   return axios({
//     method: 'DELETE',
//     url: `${API_BASE_URL}/mail/sender/1/`,
//     headers: {
//       "Authorization": `Bearer ${token}`,
//     }

//   })
// }

// unsubscribe delete
Api.UnsubscribeDelete = (token, data) => {
  return axios({
    method: 'PUT',
    url: `${API_BASE_URL}/unsubscribes/unsubcribedelete/`,
    data: {
      "data": [3]
    },
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
}
Api.CampaignTableDataApi = (token) => {
  return axios({
    method: 'GET',
    url: `${API_BASE_URL}/campaign/view/`,
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
}
Api.MailSenderApi = (mailData, token) => {
  return axios({
    method: 'POST',
    url: `${API_BASE_URL}/mail/addmailaccount/`,
    data: mailData,
    headers: {
      "Authorization": `Bearer ${token}`,
    }

  })
}
Api.MailGetDataApi = (token) => {
  return axios({
    method: 'GET',
    url: `${API_BASE_URL}/mail/addmailaccount/`,
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })

}
Api.MailAccountDelete = (token, id) => {
  return axios({
    url: `${API_BASE_URL}/mail/updatedeletemailaccount/${id}/`,
    method: 'DELETE',
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
}

Api.MailAccountUpdateApi = (token, data, id) => {
  return axios({
    url: `${API_BASE_URL}/mail/updatedeletemailaccount/${id}/`,
    data: {},
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`
    },
    data: data
  })
}
Api.fetchUnsbcribed = (token) => {
  console.log("hii 2")
  return axios({
    method: 'GET',
    url: `${API_BASE_URL}/unsubscribes/unsubcribeview/`,
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
}
Api.deleteUnsbcribed = (data, token) => {
  return axios({
    method: 'put',
    url: `${API_BASE_URL}/unsubscribes/unsubcribedelete/`,
    data: {
      data: data
    },
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
}
Api.GetAllCampaigns = (token) => {
  return axios({
    url: `${API_BASE_URL}/campaign/view/`,
    data: {},
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
}
Api.CampaignCreateGetApi = (token, id) => {
  return axios({
    method: 'GET',
    url: `${API_BASE_URL}/campaign/savecamp/${id}/`,
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
}

// GET SCHEDULE API
Api.GetScheduleApi = (token) => {
  return axios({
    method: 'GET',
    url: `${API_BASE_URL}/campaignschedule/updateschedulemail/`,
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
}

//UPDATE SCHEDULE
Api.UpdateScheduleApi = (token) => {
  return axios({
    method: 'PUT',
    url: `${API_BASE_URL}/campaignschedule/updateschedulemail/`,
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
}

export default Api;