import './BudgetComments.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector} from 'react-redux';

function BudgetComments() {

    const [budgets, setBudgets] = useState([]);
    const [comments, setComments] = useState([]);
    const [editingComment, setEditingComment] = useState({ id: null, content: "" });

    const [budgetComments, setBudgetComments] = useState({});

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
      console.log('handle delete ID:', commentId);
      axios.delete(`/api/comments/${commentId}`)
        .then((response) => {
        fetchComments(); // Refetch comments after the update
        })
        .catch((error) => {
          console.log('Error deleting comment', error);
        });
    };
    // Add comment Function
    const handleSubmit = (budgetId) => {
      const requestData = {
        comment: budgetComments[budgetId] || "", // Get the comment for the specific budget
        budgetID: budgetId,
      };
      console.log('Post Request Data', requestData);
      axios.post('/api/comments', requestData)
        .then((response) => {
          console.log(`Comment data submitted successfully`);
          fetchComments();
          // Clear the comment for the specific budget
          setBudgetComments({ ...budgetComments, [budgetId]: "" });
        })
        .catch(error => {
          console.log('Error submitting Comment data', error);
        });
    }
    
    
    //Use Effect
    useEffect(() => {
      fetchBudgets();
      fetchComments();
    }, []);

    return (
      <>

      <div className='comment-page'>
        <div id='comment-card'>
            <h1>Comment any budget insights you have here!</h1>

            <div id='budget-comments'>
              {budgets.map((budget) => (
              <div key={budget.id}>
                <h3>{budget.budgetTitle} {budget.id}</h3>
                  <ul>
                  {comments
                  .filter((comment) => comment.budget_id === budget.id) 
                  .map((comment) => (
                    <li key={comment.id}>
                      {editingComment.id === comment.id ? (
                        <input
                          type="text"
                          value={editingComment.content}
                          onChange={(e) => setEditingComment({ id: comment.id, content: e.target.value })}
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
                <form onSubmit={(event) => {
                  event.preventDefault(); 
                  handleSubmit(budget.id);
                }}>
                  <input
                    type="text"
                    value={budgetComments[budget.id] || ""}
                    onChange={(event) => setBudgetComments({ ...budgetComments, [budget.id]: event.target.value })}
                  />
                  <button type="submit">Add Comment</button>
                </form>
              </div>
            ))}
            </div>

        </div>
      </div>
      
    </>
    )
}

export default BudgetComments;