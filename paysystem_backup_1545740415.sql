

CREATE TABLE `branch` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `branch` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `detail` text NOT NULL,
  `delete_status` enum('0','1') NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

INSERT INTO branch VALUES("1","MCB","248","","0");



CREATE TABLE `fees_transaction` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `stdid` varchar(255) NOT NULL,
  `paid` int(255) NOT NULL,
  `submitdate` date NOT NULL,
  `transcation_remark` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=latin1;

INSERT INTO fees_transaction VALUES("76","","0","2018-01-01","");
INSERT INTO fees_transaction VALUES("77","","0","2018-02-02","");
INSERT INTO fees_transaction VALUES("78","","0","2018-03-11","");
INSERT INTO fees_transaction VALUES("79","","0","2018-04-11","");
INSERT INTO fees_transaction VALUES("80","","0","2018-05-12","");
INSERT INTO fees_transaction VALUES("81","","0","2018-06-19","");
INSERT INTO fees_transaction VALUES("82","","0","2018-07-10","");
INSERT INTO fees_transaction VALUES("83","","0","2018-08-11","");
INSERT INTO fees_transaction VALUES("84","","0","2018-09-24","");
INSERT INTO fees_transaction VALUES("85","","0","2018-10-10","");
INSERT INTO fees_transaction VALUES("86","","0","2018-11-11","");
INSERT INTO fees_transaction VALUES("87","","0","2018-12-11","");



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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

INSERT INTO student VALUES("1","waqasoghi446@gmail.com","Waqas Maqbool","45","","Nursery","1200","1","1000","1");



CREATE TABLE `user` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `emailid` varchar(255) NOT NULL,
  `lastlogin` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

INSERT INTO user VALUES("1","waqas.maqbool","31e162b0ab642268366a76ebf4bdc962","Lewa","lewa@gmail.com","0000-00-00 00:00:00");

