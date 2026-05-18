package org.cours;

import org.cours.web.VoitureController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class SpringDataRestApplicationTests {

	@Autowired
	private VoitureController voitureController;

	@Test
	void contextLoads() {
		assertThat(voitureController).isNotNull();
	}
}
