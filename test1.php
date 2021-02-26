<?php
$pdo = new PDO('mysql:host=' . 'localhost' . ';dbname=' . 'project_db' . ';charset=utf8', 'root', '');

$sss = '" or ""="';
// $a = addslashes(trim($sss));
// $stmt = $pdo->prepare('select * from customer where customer_id = "'.$a.'"');
// print_r($stmt);

// $stmt->execute();
// $data = $stmt->fetch();
// print_r($data);
?>
<script>
alert(strip_tags('<?php echo $sss; ?>'));
</script>