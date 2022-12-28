

CREATE TABLE `branch` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `branch` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `detail` text NOT NULL,
  `delete_status` enum('0','1') NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

INSERT INTO branch VALUES("1","MCB","54","","1");
INSERT INTO branch VALUES("2","Magna","545","","0");
INSERT INTO branch VALUES("3","Magna Afternoon","665","","0");
INSERT INTO branch VALUES("4","YPO","115","","0");



CREATE TABLE `fees_transaction` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `stdid` varchar(255) NOT NULL,
  `paid` int(255) NOT NULL,
  `submitdate` date NOT NULL,
  `transcation_remark` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;

INSERT INTO fees_transaction VALUES("1","","0","2018-01-01","");
INSERT INTO fees_transaction VALUES("2","","0","2018-02-02","");
INSERT INTO fees_transaction VALUES("3","","0","2018-03-11","");
INSERT INTO fees_transaction VALUES("4","","0","2018-04-11","");
INSERT INTO fees_transaction VALUES("5","","0","2018-05-12","");
INSERT INTO fees_transaction VALUES("6","","0","2018-06-19","");
INSERT INTO fees_transaction VALUES("7","","0","2018-07-10","");
INSERT INTO fees_transaction VALUES("8","","0","2018-08-11","");
INSERT INTO fees_transaction VALUES("9","","0","2018-09-24","");
INSERT INTO fees_transaction VALUES("10","","0","2018-10-10","");
INSERT INTO fees_transaction VALUES("11","","0","2018-11-11","");
INSERT INTO fees_transaction VALUES("12","","200","2018-12-11","");
INSERT INTO fees_transaction VALUES("15","2","0","0000-00-00","");
INSERT INTO fees_transaction VALUES("16","3","0","0000-00-00","");
INSERT INTO fees_transaction VALUES("17","2","100","2018-12-11","");
INSERT INTO fees_transaction VALUES("18","3","100","2018-12-10","");
INSERT INTO fees_transaction VALUES("19","4","0","0000-00-00","");
INSERT INTO fees_transaction VALUES("20","4","150","2018-12-25","");
INSERT INTO fees_transaction VALUES("21","2","100","2018-06-14","");



CREATE TABLE `student` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `emailid` varchar(255) NOT NULL,
  `sname` varchar(255) NOT NULL,
  `joindate` int(11) NOT NULL,
  `about` text NOT NULL,
  `contact` varchar(255) NOT NULL,
  `fees` int(255) NOT NULL,
  `branch` varchar(255) NOT NULL,
  `balance` int(255) NOT NULL,
  `delete_status` enum('0','1') NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

INSERT INTO student VALUES("1","waqasoghi446@gmail.com","Waqas Maqbool","21","","Nursery","1200","1","950","1");
INSERT INTO student VALUES("2","waqasoghi446@gmail.com","Waqas Maqbool","66356","","Nursery","1200","2","1000","0");
INSERT INTO student VALUES("3","","sejfwe","454","","Nursery","454","2","354","1");
INSERT INTO student VALUES("4","","abdullah","121","","FOUR","1450","3","1300","0");



CREATE TABLE `user` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `emailid` varchar(255) NOT NULL,
  `lastlogin` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

INSERT INTO user VALUES("1","waqas.maqbool","31e162b0ab642268366a76ebf4bdc962","WaqasMaqbool","waqasoghi446@gmail","0000-00-00 00:00:00");

