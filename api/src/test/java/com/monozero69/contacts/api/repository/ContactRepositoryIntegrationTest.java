package com.monozero69.contacts.api.repository;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import com.monozero69.contacts.api.model.Contact;

@DataJpaTest
@ActiveProfiles("test")
@DisplayName("Contact repository")
public class ContactRepositoryIntegrationTest {
    
    @Autowired
    ContactRepository contactRepository;

    @Test
    @DisplayName("should save contact")
    void shouldSaveContact() {
        var newContact = new Contact(
                                "Jack", 
                                "Cody", 
                                "01234567890", 
                                "fake@test.com",
                                "first line of address",
                                "second line of adddress",
                                "third line of address",
                                "Test City",
                                "Test County",
                                "LS1 3WE",
                                "England"
                            );
        
        var savedContact = contactRepository.save(newContact);

        assertThat(savedContact.getId()).isNotNull();
        assertThat(savedContact.getFirstname()).isEqualTo(newContact.getFirstname());
        assertThat(savedContact.getLastname()).isEqualTo(newContact.getLastname());
        assertThat(savedContact.getPhonenumber()).isEqualTo(newContact.getPhonenumber());
        assertThat(savedContact.getEmail()).isEqualTo(newContact.getEmail());
        assertThat(savedContact.getFirstLineOfAddress()).isEqualTo(newContact.getFirstLineOfAddress());
        assertThat(savedContact.getSecondLineOfAddress()).isEqualTo(newContact.getSecondLineOfAddress());
        assertThat(savedContact.getThirdLineOfAddress()).isEqualTo(newContact.getThirdLineOfAddress());
        assertThat(savedContact.getCity()).isEqualTo(newContact.getCity());
        assertThat(savedContact.getCounty()).isEqualTo(newContact.getCounty());
        assertThat(savedContact.getPostcode()).isEqualTo(newContact.getPostcode());
        assertThat(savedContact.getCountry()).isEqualTo(newContact.getCountry());
    }

}
