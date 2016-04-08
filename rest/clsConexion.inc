<?php

/**
 * Class orclConn
 * POO class for Oracle Database connections
 * @author egonzalezm24
 *  POO clase modificada por jafg22 para adptarse a MySql
 */

    class mysqlConn {
        private $dbInstance;
        private $user;
        private $psswd;
        private $db;

        public $sqlQuery;
        private $conex;
        private $ResultSet;

        /**
         * @param string $user <b>Database User</b>
         * @param string $psswd <b>Database Password</b>
         * @param string $dbInstance <b>Database Instance</b>
         * @param string $db <b>Database Database</b>
         */
        public function __construct($user = "", $psswd = "", $dbInstance = "", $db = ""){
            $this->dbInstance = $dbInstance;
            $this->user = $user;
            $this->psswd = $psswd;
            $this->db = $db;

        }

        /**
         * @param $user <b>Connection User</b>
         */
        public function setUser($user){
            $this->user = $user;
        }

        /**
         * @return string <b>Connection User</b>
         */
        public function getUser(){
            return $this->user;
        }

        /**
         * @param $psswd <b>Connection Password</b>
         */
        public function setPsswd($psswd){
            $this->psswd = $psswd;
        }

        /**
         * @param $dbInstance <b>Connection Database Instance</b>
         */
        public function setDbInstance($dbInstance){
            $this->dbInstance = $dbInstance;
        }

        /**
         * @return string <b>Connection Database Instance</b>
         */
        public function getDbInstance(){
            return $this->dbInstance;
        }

        /**
         * @param $dbInstance <b>Connection Database </b>
         */
        public function setDb($db){
            $this->db = $db;
        }

        /**
         * @return string <b>Connection Database </b>
         */
        public function getDb(){
            return $this->db;
        }

        /**
         * @return bool <b>TRUE</b> if connection on success,
         *  or <b>False</b> on failure.
         * Also Displays an htmlentities error
         */
        public function conectar(){
            $this->conex = new mysqli($this->dbInstance, $this->user, $this->psswd, $this->db);
            if ($this->conex->connect_error){
                $this->displayConnError($this->conex);
                return false;
            } else {
                return true;
            }
        }

        /**
         * For queries without response. (UPDATE, DELETE, ETC)
         * @return bool <b>TRUE</b> if connection on success,
         *  or <b>False</b> on failure.
         * Also Displays an htmlentities error
         */
        public function execute(){            
            if (!$this->conex){
                $this->displayError($this->conex);
            } else {
                $this->ResultSet = $this->conex->prepare($this->cleanQuery($this->sqlQuery));                 
                $this->sqlQuery = "";
                if (!$this->ResultSet){
                    $this->displayError($this->ResultSet);
                    return false;
                } else {
                    return $this->ResultSet->execute();
                }
            }
        }

        /**
         * For queries with a response
         * @return bool|resource
         * ResulSet if success, False on failure or blank ResultSet
         */
        public function executeQuery(){            
            if (!$this->conex){
                $this->displayError($this->conex);
            } else {
                $this->ResultSet = $this->conex->query($this->cleanQuery($this->sqlQuery)); 
                $this->sqlQuery = "";
                if (!$this->ResultSet){
                    $this->displayError($this->ResultSet);
                    return false;
                } else {                    
                    return $this->ResultSet;                        
                    }
                }
        }

        /**
         * @param $query PL/SQL Query
         * @return string Scaped Query (For SQLi)
         */
        private function cleanQuery($query){
            $query = strip_tags($query);
            $query = stripslashes($query);
            $query = stripcslashes($query);
            return $query;
        }

        /**
         * @param $resource Resource of error.
         * Displays the last OCI error.
         */
        public function displayConnError($resource) {

            if ($resource ->connect_error) {            
            trigger_error(htmlentities("Fallo al conectar a MySQL: (" . $resource->connect_errno . ") " .
             $resource->connect_error, ENT_QUOTES), E_USER_ERROR);
        }

        }

        /**
         * Kill the connection
         */
        public function kill(){
            $this->conex->close();
        }
    }