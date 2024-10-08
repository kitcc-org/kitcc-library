INSERT INTO
    books (title, author, publisher, thumbnail, isbn, stock)
VALUES
    ('コンピュータプログラミングの基礎', json_array('山田 太郎', '佐藤 花子'), '技術評論社', 'https://example.com/thumbnail1.jpg', '9781234567890', 3),
    ('ソフトウェア設計入門', json_array('高橋 一郎'), 'オーム社', 'https://example.com/thumbnail2.jpg', '9780987654321', 2),
    ('データベースシステム', json_array('鈴木 二郎', '田中 三郎'), '日経BP', 'https://example.com/thumbnail3.jpg', '9782345678901', 5),
    ('ネットワーク技術の基礎', json_array('佐藤 四郎'), '翔泳社', 'https://example.com/thumbnail4.jpg', '9783456789012', 4),
    ('アルゴリズムとデータ構造', json_array('中村 五郎', '伊藤 六郎'), '森北出版', 'https://example.com/thumbnail5.jpg', '9784567890123', 6);
