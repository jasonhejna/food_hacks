            <?php
            //Variables for connecting to your database.
            //These variable values come from your hosting account.
            $hostname = "foodhacker.db.8532513.hostedresource.com";
            $username = "foodhacker";
            $dbname = "foodhacker";

            //These variable values need to be changed by you before deploying
            $password = "g4%Gb7S%88@i2#";
        
            //Connecting to your database
            mysql_connect($hostname, $username, $password) OR DIE ("Fatal error, please try again later.");
            mysql_select_db($dbname);
            ?>