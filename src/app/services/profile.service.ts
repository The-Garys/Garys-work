import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http : HttpClient) { }

  getServiceProviderData(svMail) {
    return this.http.get(`http://localhost:3000/api/serviceProvider/${svMail}`)
  }

  getServiceProviderPosts(id) {
    return this.http.get(`http://localhost:3000/api/posts/${id}`)
  }
  
  getSericeProviderAppointments(id) {
    return this.http.get(`http://localhost:3000/api/appointment/${id}`)
  }
  
  submitAppointment(payload : object) {
  return this.http.post('http://localhost:3000/api/appointment', payload)
  }
  
  ImageUpload(formData : object) {
    return this.http.post('http://localhost:3000/upload', formData)
  }
  
  addPost(payload) {
    return this.http.post("http://localhost:3000/api/posts", payload)
  }

  deletePost(id) {
    return this.http.delete(`http://localhost:3000/api/posts/${id}`)
  }
 
  updateFirstName(firstName, id) {
    return this.http.put(`http://localhost:3000/api/serviceProvider/updateFirstName/${id}`, {firstName}, { responseType: 'json' })
  }
updateLastName(lastName, id) {
  return this.http.put(`http://localhost:3000/api/serviceProvider/updateLastName/${id}`, {lastName}, { responseType: 'json' })
}
updateFullName(fullName, id) {
  return this.http.put(`http://localhost:3000/api/serviceProvider/updateFullName/${id}`, {fullName}, { responseType: 'json' })
}
updateEmail(email, id) {
  return this.http.put(`http://localhost:3000/api/serviceProvider/updateEmail/${id}`, {email}, { responseType: 'json' })
}
updateAdress(adress, id) {
  return this.http.put(`http://localhost:3000/api/serviceProvider/updateAdress/${id}`, {adress}, { responseType: 'json' })
}
updatePassword(previousPassword, currentPassword, confirmPassword, id) {
  return this.http.patch(`http://localhost:3000/api/serviceProvider/updatePassword/${id}`, {previousPassword, currentPassword, confirmPassword}, { responseType: 'json' })
}

updateImage(imageUrl, id) {
  return this.http.put(`http://localhost:3000/api/serviceProvider/updateImage/${id}`, {imageUrl}, { responseType: 'json' })
}
}
