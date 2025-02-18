package com.monozero69.contacts.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.monozero69.contacts.api.model.Contact;

public interface ContactRepository extends JpaRepository<Contact, Long> {    
}
