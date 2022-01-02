import "./styles.css";

const onClickAdd = () => {
  //テキストボックスの値を取得し初期化する
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";

  createIncompleteList(inputText);
};

//未完了リストから指定の要素を削除　同じ処理なので共通化して纏めた。未完了のTODOでの完了、削除ボタンは同じ動作
const deleteFromIncompleteList = (target) => {
  document.getElementById("incomplete-list").removeChild(target);
};

//未完了のリストに追加する関数
const createIncompleteList = (text) => {
  //divタグ生成 JS上からHTMLタグを差し込む
  const div = document.createElement("div");
  div.className = "list-row";

  //liタグ生成
  const li = document.createElement("li");
  li.innerText = text;

  //button(完了)タグ作成　　　　完了ボタンを押した時のイベント
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";

  completeButton.addEventListener("click", () => {
    //押された完了ボタンの親タグ(div)を未完了リストから削除
    deleteFromIncompleteList(deleteButton.parentNode);

    //完了リストに追加する要素　親のdivタグを以下とする　１６行目、２１行目
    const addTarget = completeButton.parentNode;

    //TODO内容のテキストを取得する→innerTextで押した行のテキストを変数に保持させる。
    const text = addTarget.firstElementChild.innerText;

    //divタグ以下を初期化する（使いまわしたい）
    addTarget.textContent = null;

    //liタグの生成　　追加する
    const li = document.createElement("li");
    li.innerText = text;

    //buttonタグの生成　追加する
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    backButton.addEventListener("click", () => {
      //押された戻すボタンの親タグ(div)を完了リストから削除する処理
      const deleteTarget = backButton.parentNode;
      document.getElementById("complete-list").removeChild(deleteTarget);

      //テキストを取得 divタグ親の中のliのテキスト
      const text = backButton.parentNode.firstElementChild.innerText;
      createIncompleteList(text);
    });

    //divタグの子要素に各要素を設定
    addTarget.appendChild(li);
    addTarget.appendChild(backButton);

    //完了リストに追加　index.htmlにcomplete-listと目印をつけた
    document.getElementById("complete-list").appendChild(addTarget);
  });

  //button(削除)タグ作成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    //押された削除ボタンの親タグ(div)を未完了リストから削除
    deleteFromIncompleteList(deleteButton.parentNode);
  });

  //divタグの子要素に各要素を設定
  div.appendChild(li);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);

  //未完了のリストに追加
  document.getElementById("incomplete-list").appendChild(div);
};

document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());
