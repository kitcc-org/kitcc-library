INSERT INTO
    books (title, authors, publisher, thumbnail, isbn, stock)
VALUES
    ('機械学習入門', json_array('山田 一郎'), '技術評論社', 'https://example.com/thumbnail6.jpg', '9781234567899', 4),
    ('AIプログラミングの基礎', json_array('佐々木 二郎'), 'オーム社', 'https://example.com/thumbnail7.jpg', '9780987654330', 5),
    ('ネットワークセキュリティ', json_array('高橋 三郎'), '日経BP', 'https://example.com/thumbnail8.jpg', '9782345678910', 2);

INSERT INTO
    users (name, email, password_digest)
VALUES
    ('小林花子', 'hanako.kobayashi@example.com', 'd41d8cd98f00b204e9800998ecf8427e'),
    ('山田一郎', 'ichiro.yamada@example.com', '5d41402abc4b2a76b9719d911017c592');

INSERT INTO
    loans (user_id, book_id, volume)
VALUES
    -- 小林花子が機械学習入門を貸出
    (1, 1, 1),
    -- 小林花子がAIプログラミングの基礎を貸出
    (1, 2, 1),
    -- 山田一郎がAIプログラミングの基礎を貸出
    (2, 2, 1),
    -- 山田一郎がネットワークセキュリティを貸出
    (2, 3, 1);
