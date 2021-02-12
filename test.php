<form id='form' action="test1.php" method="post">
    <input type="text" name='username' value="maple2020">
    <input type="text" name="password" value="maple2020">
    <button>กด</button>
</form>

<script>
    var url = 'http://maplesiam.com/?base=misc&script=login';
    var formData = new FormData();
    formData.append('username', 'maple2020');
    formData.append('password', 'maple2020');

    const aaa = async () => {
        fetch(url, {
                method: 'POST',
                body: formData
            })
            .then(function(response) {
                return response.text();
            })
            .then(function(body) {
                if (body == '                        failed') {
                    alert('a')
                } else {
                    alert('b')
                }
                console.log(body);
            });
    }
    while(true){
        aaa();
    }
</script>