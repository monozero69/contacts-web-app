package com.monozero69.contacts.api.model;

import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Contact {
    
    @Id
    @GeneratedValue
    Long id;

    private String firstname;

    private String lastname;

    private String phonenumber;

    private String email;

    private String firstLineOfAddress;

    private String secondLineOfAddress;

    private String thirdLineOfAddress;

    private String city;

    private String county;

    private String postcode;
    
    private String country;
    
    public Contact() {
        super();
    }
    
    public Contact(String firstname, String lastname, String phonenumber, String email, String firstLineOfAddress,
            String secondLineOfAddress, String thirdLineOfAddress, String city, String county, String postcode,
            String country) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.phonenumber = phonenumber;
        this.email = email;
        this.firstLineOfAddress = firstLineOfAddress;
        this.secondLineOfAddress = secondLineOfAddress;
        this.thirdLineOfAddress = thirdLineOfAddress;
        this.city = city;
        this.county = county;
        this.postcode = postcode;
        this.country = country;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getFirstname() {
        return firstname;
    }
    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }
    public String getLastname() {
        return lastname;
    }
    public void setLastname(String lastname) {
        this.lastname = lastname;
    }
    public String getPhonenumber() {
        return phonenumber;
    }
    public void setPhonenumber(String phonenumber) {
        this.phonenumber = phonenumber;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getFirstLineOfAddress() {
        return firstLineOfAddress;
    }
    public void setFirstLineOfAddress(String firstLineOfAddress) {
        this.firstLineOfAddress = firstLineOfAddress;
    }
    public String getSecondLineOfAddress() {
        return secondLineOfAddress;
    }
    public void setSecondLineOfAddress(String secondLineOfAddress) {
        this.secondLineOfAddress = secondLineOfAddress;
    }
    public String getThirdLineOfAddress() {
        return thirdLineOfAddress;
    }
    public void setThirdLineOfAddress(String thirdLineOfAddress) {
        this.thirdLineOfAddress = thirdLineOfAddress;
    }
    public String getCity() {
        return city;
    }
    public void setCity(String city) {
        this.city = city;
    }
    public String getCounty() {
        return county;
    }
    public void setCounty(String county) {
        this.county = county;
    }
    public String getPostcode() {
        return postcode;
    }
    public void setPostcode(String postcode) {
        this.postcode = postcode;
    }
    public String getCountry() {
        return country;
    }
    public void setCountry(String country) {
        this.country = country;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, firstname, lastname, phonenumber, email, 
                            firstLineOfAddress, secondLineOfAddress, thirdLineOfAddress, 
                            city, county, postcode, country);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;

        if (obj == null || getClass() != obj.getClass()) return false;
        
        var contact = (Contact) obj;

        return Objects.equals(id, contact.getId())
                    && Objects.equals(firstname, contact.getFirstname())
                    && Objects.equals(lastname, contact.getLastname())
                    && Objects.equals(phonenumber, contact.getPhonenumber())
                    && Objects.equals(email, contact.getEmail())
                    && Objects.equals(firstLineOfAddress, contact.getFirstLineOfAddress())
                    && Objects.equals(secondLineOfAddress, contact.getSecondLineOfAddress())
                    && Objects.equals(thirdLineOfAddress, contact.getThirdLineOfAddress())
                    && Objects.equals(city, contact.getCity())
                    && Objects.equals(county, contact.getCounty())
                    && Objects.equals(postcode, contact.getPostcode())
                    && Objects.equals(country, contact.getCountry());
    }

    
}
