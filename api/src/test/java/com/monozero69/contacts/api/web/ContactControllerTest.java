package com.monozero69.contacts.api.web;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;

import static org.assertj.core.api.Assertions.assertThat;

@WebMvcTest(controllers = ContactController.class)
@DisplayName("the contact controller")
public class ContactControllerTest {

    @Autowired
    private ContactController contactController;

    @Test
    @DisplayName("should exists")
    void shouldExists() {
        assertThat(contactController).isNotNull();
    }

}