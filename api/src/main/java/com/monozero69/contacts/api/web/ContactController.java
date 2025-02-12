package com.monozero69.contacts.api.web;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.monozero69.contacts.api.model.Contact;
import com.monozero69.contacts.api.repository.ContactRepository;

@RestController
@RequestMapping("/api/contacts")
public class ContactController {

    private final ContactRepository contactRepository;

    public ContactController(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    @PostMapping
    public ResponseEntity<Contact> addNewContact(@RequestBody Contact newContact) {
        var savedContact = contactRepository.save(newContact);

        return ResponseEntity
                    .created(URI.create("/api/contacts/%s".formatted(savedContact.getId())))
                    .body(savedContact);
    }

}