
<?php 

/**
 * PDO clase conexion hecha por jafg22 Jose Flores
 */
class pdoConexion
{
    private $host;
    private $typeDb;
    private $user;
    private $pass;
    private $database;

    public $Sqlquery;
    public $pdoQuery1;
    public $pdoQuery2;
    public $bindParams;

    private $conex;
    private $sentencia;
    private $rows;

    /**
         * @param string $user <b>Database User</b>
         * @param string $psswd <b>Database Password</b>
         * @param string $dbInstance <b>Database Instance</b>
         * @param string $db <b>Database Database</b>
         * @param string $db <b>Type Database</b>
         */

    public function __construct($host = "",$typeDb = "", $user = "", $pass = "", $database = "")
    {
    	 	$this->host = $host;
    	 	$this->typeDb = $typeDb;
            $this->user = $user;
            $this->psswd = $pass;
            $this->db = $database;        
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
        public function setPsswd($pass){
            $this->psswd = $pass;
        }

        /**
         * @param $dbInstance <b>Connection Database Instance</b>
         */
        public function setHost($host){
            $this->host = $host;
        }

        /**
         * @return string <b>Connection Database Instance</b>
         */
        public function getHost(){
            return $this->host;
        }

        /**
         * @param $dbInstance <b>Connection Database Instance</b>
         */
        public function setTypedb($typeDb){
            $this->typeDb = $typeDb;
        }

        /**
         * @return string <b>Connection Database Instance</b>
         */
        public function getTypedb(){
            return $this->typeDb;
        }

        /**
         * @param $dbInstance <b>Connection Database </b>
         */
        public function setDb($databse){
            $this->db = $databse;
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

        public function conectar()
        {
        	
			try{
				$this->conex = new PDO($this->typeDb.':host='.$this->host.';dbname='.$this->db, $this->user, $this->psswd);
				$this->conex->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				return true;
			}catch(PDOException $e){
				echo "ERROR: " . $e->getMessage();				
				return false;
				}

        }

        public function execute()
        {
        	$this->sentencia = $this->conex->prepare($this->$Sqlquery);
        	$this->rows = $this->sentencia->execute($this->bindParams);

        	if ($this->rows == 1) {
        		return true;
			} catch(PDOException $e) {
  				echo 'Error: ' . $e->getMessage();
  				return false;
			}
        }
}


?>