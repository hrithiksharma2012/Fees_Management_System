

CREATE TABLE `branch` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `branch` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `detail` text NOT NULL,
  `delete_status` enum('0','1') NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;



CREATE TABLE `fees_transaction` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `stdid` varchar(255) NOT NULL,
  `paid` int(255) NOT NULL,
  `submitdate` date NOT NULL,
  `transcation_remark` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=latin1;

INSERT INTO fees_transaction VALUES("1","","0","2018-01-01","");
INSERT INTO fees_transaction VALUES("2","","0","2018-02-02","");
INSERT INTO fees_transaction VALUES("3","","0","2018-03-11","");
INSERT INTO fees_transaction VALUES("04","","0","2018-04-11","");
INSERT INTO fees_transaction VALUES("05","","0","2018-05-12","");
INSERT INTO fees_transaction VALUES("06","","0","2018-06-19","");
INSERT INTO fees_transaction VALUES("07","","0","2018-07-10","");
INSERT INTO fees_transaction VALUES("08","","0","2018-08-11","");
INSERT INTO fees_transaction VALUES("09","","0","2018-09-24","");
INSERT INTO fees_transaction VALUES("10","","0","2018-10-10","");
INSERT INTO fees_transaction VALUES("11","","0","2018-11-11","");
INSERT INTO fees_transaction VALUES("12","","0","2018-12-11","");



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

