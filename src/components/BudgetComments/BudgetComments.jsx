import './BudgetComments.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector} from 'react-redux';

function BudgetComments() {

    const budgetID = useSelector(store => store.budgetID)
    const [budgets, setBudgets] = useState([]);
    const [commentToPost, setCommentToPost] = useState('');
    const [comments, setComments] = useState('');

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
      const handleEditComment = (commentId, updatedComment) => {
        axios.put(`/api/comments/${commentId}`, { comment: updatedComment })
          .then((response) => {
            // Handle the update in your UI
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



      useEffect(() => {
        fetchBudgets();
        fetchComments();
      }, []);
    
    const handleSubmit = () => {

      const requestData = {
        comment,
        budgetID: parseInt(budgetID)
      }
      console.log('Post Request Data', requestData);
      axios.post('/api/comments', requestData)
        .then((response) => {
            console.log(`Comment data submitted successfully`);
        }).catch(error => {
            console.log('Error submitting Comment data', error);
        });
    };

    return (
      <>
      <h1>Comment any budget insights you have here!</h1>
      {budgets.map((budget) => (
        <div key={budget.id}>
          <h2>{budget.budgetTitle}</h2>
          <ul>
            {/* {comments
              .filter((comment) => comment.budgetID === budget.id)
              .map((comment) => (
                <li key={comment.id}>
                  {comment.comment}
                  <button onClick={() => handleEditComment(comment.id)}>Edit</button>
                  <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                </li>
              ))} */}
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