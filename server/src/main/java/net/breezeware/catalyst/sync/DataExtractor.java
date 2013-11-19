package net.breezeware.catalyst.sync;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.sql.DataSource;
import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

/**
 * Created by ktm on 10/9/13.
 */
@Component
public class DataExtractor {

    @Value("${dataDirectory}")
    String EXTRACTION_DIR = null;

    @Value("${villageDDL}")
    String VILLAGE_DDL = null;

    @Value("${memberDDL}")
    String MEMBER_DDL = null;

    @Autowired
    @Qualifier("catalystDataSource")
    DataSource catalystSource;

   public void createExtraction(String clientId) {
       if (StringUtils.isEmpty(clientId)) {
           clientId = "0";
       }

       Connection connection = null;
       try {
           connection = createConnection(clientId);
           createTables(connection);
           extractVillages(connection);
           extractMembers(connection);
       } catch (Throwable th) {
           th.printStackTrace();
       } finally {
           try {
              if(connection != null) {
                 connection.close();
              }
           }
           catch(SQLException e) {
               e.printStackTrace();
           }
       }
   }

    protected Connection createConnection(String clientId) throws ClassNotFoundException, SQLException {
        String tempDir = System.getProperty("java.io.tmpdir");
        String dbDir = EXTRACTION_DIR;
        if (dbDir == null) {
            dbDir = tempDir;
        }
        String dbFileName = dbDir + clientId + ".db";
        Class.forName("org.sqlite.JDBC");
        Connection connection = DriverManager.getConnection("jdbc:sqlite:" + dbFileName);
        return connection;
    }

    protected void executeSQLite(Connection connection, String sql) {
        Statement statement = null;
        try {
            statement = connection.createStatement();
            statement.setQueryTimeout(30);  // set timeout to 30 sec.

            statement.executeUpdate(sql);
        } catch(Throwable th) {
            System.err.println("Error executing SQL: " + sql);
            th.printStackTrace();
        }
        finally {
            try {
               statement.close();
            } catch(Throwable ignore) {
            }
        }
    }

    protected void createTables(Connection connection) throws SQLException, FileNotFoundException, IOException {
        File input = new File("sql/sqlite_ddl.sql");
        FileReader reader = new FileReader(input);
        BufferedReader br = new BufferedReader(reader);

        String tableDDL = "";
        String tableLine = "";
        while (null != (tableLine = br.readLine())) {
            tableDDL = tableDDL + tableLine;
            if (tableLine.contains(";")) {
                executeSQLite(connection, tableDDL);
                tableDDL = "";
            }
        }
        reader.close();
    }

    protected void extractVillages(Connection connection) throws SQLException {
        Connection catalystConn = null;
        PreparedStatement insertVillage = null;

        try {
            insertVillage = connection.prepareStatement("insert into location(_id, code, display_name) values(?,?,?)");
            catalystConn = catalystSource.getConnection();
            Statement statement = catalystConn.createStatement();
            ResultSet villageSet = statement.executeQuery("select * from location");
            while (villageSet.next()) {
                Integer idx = villageSet.getInt(1);
                String code = villageSet.getString(2);
                String name = villageSet.getString(3);

                insertVillage.setInt(1, idx);
                insertVillage.setString(2, code);
                insertVillage.setString(3, name);
                insertVillage.execute();
            }
            if (statement != null) {
                statement.close();
            }
        } finally {
            try {
                if(catalystConn != null) {
                    catalystConn.close();
                }
            }
            catch(SQLException e) {
                e.printStackTrace();
            }
        }
    }


    protected void extractMembers(Connection connection) throws SQLException {
        Connection catalystConn = null;
        PreparedStatement insertMember = null;

        try {
            insertMember = connection.prepareStatement("insert into member(_id, display_name, location) values(?,?,?)");
            catalystConn = catalystSource.getConnection();
            Statement statement = catalystConn.createStatement();
            ResultSet villageSet = statement.executeQuery("select _id, display_name, location from member");
            while (villageSet.next()) {
                Integer idx = villageSet.getInt(1);
                String name = villageSet.getString(2);
                String village = villageSet.getString(3);

                insertMember.setInt(1, idx);
                insertMember.setString(2, name);
                insertMember.setString(3, village);
                insertMember.execute();
            }
            if (statement != null) {
                statement.close();
            }
        } finally {
            try {
                if(catalystConn != null) {
                    catalystConn.close();
                }
            }
            catch(SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
