INSERT INTO
    books (id, title, authors, publisher, published_date, description, thumbnail, isbn, stock)
VALUES
    (
		1
        'コンピュータプログラミングの基礎',
        json_array('山田 太郎', '佐藤 花子'),
        '技術評論社',
        '2020-01-15',
        'コンピュータプログラミングの基礎を学ぶための最良の参考書です。',
        'https://www.oreilly.co.jp/books/images/picture_large978-4-87311-565-8.jpeg',
        '9781234567890',
        1
    ),
    (
		2
        'ソフトウェア設計入門',
        json_array('高橋 一郎'),
        'オーム社',
        '2019-10-01',
        'ソフトウェア設計の入門書。設計の基本から実践までをカバー。',
        'https://www.oreilly.co.jp/books/images/picture_large978-4-87311-565-8.jpeg',
        '9780987654321',
        1
    ),
    (
		3
        'データベースシステム',
        json_array('鈴木 二郎', '田中 三郎'),
        '日経BP',
        '2018-05-20',
        'データベースの基礎から応用までを網羅した一冊。',
        'https://www.oreilly.co.jp/books/images/picture_large978-4-87311-565-8.jpeg',
        '9782345678901',
        1
    ),
    (
		4
        'ネットワーク技術の基礎',
        json_array('佐藤 四郎'),
        '翔泳社',
        '2021-07-10',
        'ネットワーク技術の基礎を解説する教科書。',
        'https://www.oreilly.co.jp/books/images/picture_large978-4-87311-565-8.jpeg',
        '9783456789012',
        2
    ),
    (
		5
        'アルゴリズムとデータ構造',
        json_array('中村 五郎', '伊藤 六郎'),
        '森北出版',
        '2017-12-05',
        'アルゴリズムとデータ構造に関する理論と実践を学べる本。',
        'https://www.oreilly.co.jp/books/images/picture_large978-4-87311-565-8.jpeg',
        '9784567890123',
        3
    );
