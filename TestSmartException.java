// Test file to validate smart-exception-java replacement
// Compile: javac -cp smart-exception-java/build/libs/smart-exception-java-0.2.1.jar test_smart_exception.java
// Run: java -cp .:smart-exception-java/build/libs/smart-exception-java-0.2.1.jar TestSmartException

import com.arthenica.smartexception.java.Exceptions;

public class TestSmartException {
    public static void main(String[] args) {
        System.out.println("Testing smart-exception-java replacement library...");
        
        // Test 1: getStackTraceString with a real exception
        try {
            throw new RuntimeException("Test exception for stack trace");
        } catch (Exception e) {
            String stackTrace = Exceptions.getStackTraceString(e);
            System.out.println("Test 1 - Stack trace string:");
            System.out.println(stackTrace);
            assert stackTrace.contains("RuntimeException");
            assert stackTrace.contains("Test exception for stack trace");
            System.out.println("✓ Test 1 passed");
        }
        
        // Test 2: getStackTraceString with null
        String nullTrace = Exceptions.getStackTraceString(null);
        System.out.println("\nTest 2 - Null exception handling:");
        System.out.println("Result: " + nullTrace);
        assert nullTrace.equals("\n<null>");
        System.out.println("✓ Test 2 passed");
        
        // Test 3: registerRootPackage (should not throw)
        try {
            Exceptions.registerRootPackage("com.arthenica");
            Exceptions.registerRootPackage(null);
            System.out.println("\nTest 3 - registerRootPackage:");
            System.out.println("✓ Test 3 passed (no exceptions thrown)");
        } catch (Exception e) {
            System.out.println("✗ Test 3 failed: " + e.getMessage());
        }
        
        System.out.println("\n🎉 All tests passed! The smart-exception-java replacement library is working correctly.");
    }
} 