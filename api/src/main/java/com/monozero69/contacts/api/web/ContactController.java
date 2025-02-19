package com.monozero69.contacts.api.web;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.monozero69.contacts.api.model.Contact;
import com.monozero69.contacts.api.repository.ContactRepository;

@RestController
@CrossOrigin( origins = {"http://localhost:5173"} )
@RequestMapping(ContactController.CONTACT_REST_API_ENDPOINT)
public class ContactController {

    public static final String CONTACT_REST_API_ENDPOINT = "/api/contacts"; 

    private final ContactRepository contactRepository;

    public ContactController(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    @PostMapping
    public ResponseEntity<Contact> addNewContact(@RequestBody Contact newContact) {
        var savedContact = contactRepository.save(newContact);

        return ResponseEntity
                    .created(URI.create("%s/%s".formatted(CONTACT_REST_API_ENDPOINT, savedContact.getId())))
                    .body(savedContact);
    }

    @GetMapping
    public List<Contact> getAllContacts() {
        return contactRepository.findAll();
    }

    @DeleteMapping("/{id}")
    public void deleteContact(@PathVariable Long id) {
        contactRepository.deleteById(id);
    }

    @PutMapping
    public Contact updateContact(@RequestBody Contact existingContact) {
        return contactRepository.save(existingContact);
    }
}