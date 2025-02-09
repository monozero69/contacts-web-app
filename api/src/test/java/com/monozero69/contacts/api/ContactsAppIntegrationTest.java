package com.monozero69.contacts.api;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(useMainMethod = SpringBootTest.UseMainMethod.ALWAYS)
@DisplayName("Contacts app")
public class ContactsAppIntegrationTest {
    
    @Autowired
    private ContactsApp contactsApp;

    @Test
    @DisplayName("should load the context")
    void shouldLoadTheContext() {
        assertThat(contactsApp).isNotNull();
    }
}