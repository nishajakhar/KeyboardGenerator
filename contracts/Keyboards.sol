// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Keyboards {
    enum KeyboardType {
        SixtyPercent,
        SeventyFivePercent,
        EightyPercent,
        Iso105
    }
    struct Keyboard {
        KeyboardType kind;
        address payable creator;
        bool isPBT;
        string filter;
    }
    struct Tip {
        uint keyboardId;
        address from;
        uint timestamp;
        uint amount;
    }
    Keyboard[] public keyboards;
    mapping(address => Tip[]) tips;

    event KeyboardAdded(Keyboard keyboard);
    event Tipped(uint amount, address creator);

    function createKeyboard(KeyboardType _kind, bool _isPBT,string memory _filter) payable external{
        Keyboard memory newKeyboard = Keyboard(_kind, payable(msg.sender), _isPBT, _filter);
        keyboards.push(newKeyboard);
        emit KeyboardAdded(newKeyboard);
    }


    function tip(uint _index) external payable {
        require(keyboards.length >= _index, "No Keyboard exist of such ID");
        require(msg.value > 0, "Amount not sufficient to Tip");
        tips[keyboards[_index].creator].push(Tip(_index, msg.sender,block.timestamp, msg.value));
        (keyboards[_index].creator).transfer(msg.value);
        emit Tipped(msg.value, keyboards[_index].creator);
    }

    function getKeyboards() public view returns (Keyboard[] memory){
        return keyboards;
    }
    function getTips() public view returns (Tip[] memory){
        return tips[msg.sender];
    }
}
