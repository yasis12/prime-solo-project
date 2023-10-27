import './BudgetComments.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector} from 'react-redux';

function BudgetComments() {

    //! const budgetID = useSelector(store => store.budgetID)
    const budgetID = 14;
    const [budgets, setBudgets] = useState([]);
    const [commentToPost, setCommentToPost] = useState('');
    const [comments, setComments] = useState([]);
    const [editingComment, setEditingComment] = useState({ id: null, content: "" });


    console.log('setComments', comments);

    const fetchBudgets = () => {
        axios.get('/api/budgetID/all').then((response) => {
          console.log('Fetched Budgets', response.data);
            setBudgets(response.data);
        }).catch((error) => {
          console.log('error fetching budgets', error);
          alert('Something went wrong.');
        });
      }

      const fetchComments = () => {
        axios.get('/api/comments').then((response) => {
          console.log('Fetched comments', response.data);
          setComments(response.data);
        }).catch((error) => {
          console.log('error fetching budgets', error);
          alert('Something went wrong.');
        });
      }

    // Edit Comment Function
    const handleUpdateComment = (commentId) => {
      axios.put(`/api/comments/${commentId}`, { comment: editingComment.content })
        .then((response) => {
          setEditingComment({ id: null, content: "" }); // Reset the editing state
          fetchComments(); // Refetch comments after the update
        })
        .catch((error) => {
          console.log('Error editing comment', error);
        });
    };
    
    

    // Delete Comment Function
    const handleDeleteComment = (commentId) => {
      axios.delete(`/api/comments/${commentId}`)
        .then((response) => {
          // Handle the deletion in your UI
        })
        .catch((error) => {
          console.log('Error deleting comment', error);
        });
    };
    // Add comment Function
    const handleSubmit = () => {
      const requestData = {
        comment: commentToPost,
        budgetID: parseInt(budgetID)
      };
      console.log('Post Request Data', requestData);
      axios.post('/api/comments', requestData)
        .then((response) => {
          console.log(`Comment data submitted successfully`);
          fetchComments();
        }).catch(error => {
          console.log('Error submitting Comment data', error);
        });
    };
    
    
    //Use Effect
    useEffect(() => {
      fetchBudgets();
      fetchComments();
    }, []);

    return (
      <>
      <h1>Comment any budget insights you have here!</h1>
      {budgets.map((budget) => (
        <div key={budget.id}>
          <h2>{budget.budgetTitle}</h2>
          <ul>
          {comments
            .filter((comment) => comment.budgetID === budget.id)
            .map((comment) => (
              <li key={comment.id}>
                {editingComment.id === comment.id ? (
                  <input
                    type="text"
                    value={editingComment.content}
                    onChange={(e) =>
                      setEditingComment({
                        id: comment.id,
                        content: e.target.value,
                      })
                    }
                  />
                ) : (
                  comment.comments
                )}
                {editingComment.id === comment.id ? (
                  <button onClick={() => handleUpdateComment(comment.id)}>Save</button>
                ) : (
                  <button onClick={() => setEditingComment({ id: comment.id, content: comment.comments })}>Edit</button>
                )}
                <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
              </li>
            ))}

          </ul>
          <form onSubmit={() => handleSubmit(budget.id)}>
            <input type="text" value={commentToPost} onChange={(event) => setCommentToPost(event.target.value)} />
            <button type="submit">Add Comment</button>
          </form>
        </div>
      ))}
    </>
    )
}

export default BudgetComments;