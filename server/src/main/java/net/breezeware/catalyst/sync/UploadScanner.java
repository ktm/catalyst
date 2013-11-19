package net.breezeware.catalyst.sync;

import java.nio.file.WatchService;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class UploadScanner
{
    final static long scannerDelayMillis = 30000L;
    final static long scannerIntervalMillis = 60000L;

   private WatchService watchService;

   public UploadScanner() {
   }

   @Scheduled(initialDelay=scannerDelayMillis, fixedRate=scannerIntervalMillis)
   public void scanDirectory() {
      watchService.poll();
   }
}
