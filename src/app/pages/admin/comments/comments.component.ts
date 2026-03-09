import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentsService } from 'src/app/services/admin/comments.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit{
  @Input() commentId!: number;
  commentModel: any = {
    id: 0,
    description: "",
    CreatedDate: Date(),
    user: {
      id: 0,
      domainName: ""
    }
  };

  constructor(private route: ActivatedRoute, private commentsService: CommentsService){

  }

  ngOnInit(): void {
    try{
      this.loadComment(this.commentId);
    }
    catch(err){
      console.log(err);
    }
  }

  loadComment(commentId: number): void {
    try {
      this.commentsService.getById(commentId).subscribe({
        next:(response) => {
          this.commentModel = response.data;
        },
        error:(err) => {
          alert(err.error.message);
        }
      });
    }
    catch(err) {
      console.log(err);
    }
  }
}
