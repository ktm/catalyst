package net.breezeware.catalyst.sync;

import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import org.junit.Test;
import org.junit.Assert;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"classpath:META-INF/spring/applicationContext.xml"})
public class DataExtractorTest {

   @Autowired
   private DataExtractor extractor;

    @Test
    public void testProperties() {
        Assert.assertNotNull(extractor.EXTRACTION_DIR);
        Assert.assertNotNull(extractor.VILLAGE_DDL);
        Assert.assertNotNull(extractor.MEMBER_DDL);
    }

    @Test
    public void testCreateExctraction() {
        try {
        extractor.createExtraction("test");
        } catch (Throwable th) {
            Assert.fail(th.getMessage());
        }
    }

}

   
